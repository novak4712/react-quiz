import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import classes from './QuizList.module.css';
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader/Loader";

export default class QuizList extends Component {

    state = {
        quizes: [],
        loading: true
    };

    renderQuizes() {
        return this.state.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <Link to={`/quiz/${quiz.id}`}>
                        {quiz.name}
                    </Link>
                </li>
            );
        });
    }

    async componentDidMount() {
        try {
            const resp = await axios.get('/quizes.json');
            const quizes = [];
            Object.keys(resp.data).forEach((key, idx) => {
                quizes.push({
                    id: key,
                    name: `Тест №${idx + 1}`
                });
                this.setState({
                    quizes,
                    loading: false
                })
            });
        } catch (e) {
            console.log(e);
        }

    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {
                        this.state.loading
                            ? <Loader/>
                            : <ul>
                                {this.renderQuizes()}
                            </ul>
                    }

                </div>
            </div>
        );
    }
}