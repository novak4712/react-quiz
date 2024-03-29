import React, {Component} from 'react';

import classes from './Drawer.module.css';
import BackDrope from "../../UI/BackDrope/BackDrope";
import {NavLink} from "react-router-dom";

const links = [
    {to: '/', label:'Список', exact: true},
    {to: '/auth', label:'Авторизация', exact: false},
    {to: '/quiz-creator', label:'Создать тест', exact: false}
];

export default class Drawer extends Component {

    clickHandler = () =>{
        this.props.onClose();
    };

    renderLinks() {
        return links.map((link, idx) => {
            return (
                <li
                    key={idx}
                >
                    <NavLink
                        to={link.to}
                        exact={link.exact}
                        activeClassName={classes.active}
                        onClick={this.clickHandler}
                    >{link.label}</NavLink>
                </li>
            );
        });
    }

    render() {
        const cls = [
            classes.Drawer
        ];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        return (
            <React.Fragment>
                <nav
                    className={cls.join(' ')}
                >
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrope onClick={this.props.onClose}/> : null}
            </React.Fragment>
        );
    }
}
