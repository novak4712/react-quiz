import React from 'react';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

import classes from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => {
    const successCount = Object.keys(props.result).reduce((total, key) => {
        if (props.result[key] === 'success') {
            total++;
        }
        return total;
    }, 0);
    return (
        <div className={classes.FinisedQuiz}>
            Итоги тестирования
            <ul>
                {props.quiz.map((quizItem, idx) => {
                    const cls = [
                        'fa',
                        props.result[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.result[quizItem.id]]
                    ];
                    return (
                        <li key={idx}>
                            <strong>{idx + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')}/>
                        </li>
                    );
                })}
            </ul>
            <p>
                Правильно {successCount} из {props.quiz.length}
            </p>
            <div>
                <Button
                    onClick={props.onRetry}
                    type="primary"
                >Повторить</Button>

                <Link to={'/'}>
                    <Button

                        type="success"
                    >Перейти в список тестов</Button>
                </Link>
            </div>
        </div>
    );
};
export default FinishedQuiz;