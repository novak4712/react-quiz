import React, {Component} from 'react';

import classes from './Auth.module.css';
import Button from "../../components/UI/Button/Button";
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMsg: 'Введите коректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMsg: 'Введите коректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    };

    loginHandler = async () => {
        const {email, password} = this.state.formControls;
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        try{
            const responce = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB2kn1VrZ8tRFXFLjneTebZtrrpDINu0qU', authData);
            console.log(responce.data);
        }catch (e) {
            console.log(e);
        }
    };

    registerHandler = async () => {
        const {email, password} = this.state.formControls;
        const authData = {
            email: email.value,
            password: password.value,
            returnSecureToken: true
        };
        try{
            const responce = await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB2kn1VrZ8tRFXFLjneTebZtrrpDINu0qU', authData);
            console.log(responce.data);
        }catch (e) {
            console.log(e);
        }

    };

    submitHandler = (e) => {
        e.preventDefault();
    };

    validateControl(value, validation) {
        if (!validation) {
            return true;
        }
        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.email) {
            isValid = is.email(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = event.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        });

        this.setState({
            formControls,
            isFormValid
        })

    };


    renderInputs() {
        return Object.keys(this.state.formControls)
            .map((controlName, idx) => {
                const control = this.state.formControls[controlName];
                return (
                    <Input
                        key={controlName + idx}
                        label={control.label}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        touched={control.touched}
                        errorMsg={control.errorMsg}
                        shouldValidate={!!control.validation}
                        onChange={(event) => this.onChangeHandler(event, controlName)}
                    />
                );
            });

    }

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button
                            type={'success'}
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button
                            type={'primary'}
                            onClick={this.registerHandler}
                            disabled={!this.state.isFormValid}
                        >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}