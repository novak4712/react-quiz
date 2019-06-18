import React from 'react';
import classes from './AnswerList.module.css';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = (props) => {
    return (
        <ul className={classes.AnswerList}>
            {props.answers.map((answer, idx) => {
                return(
                    <AnswerItem
                        state={props.state ? props.state[answer.id] : null}
                        onAnswerClick={props.onAnswerClick}
                        answer={answer}
                        key={idx}/>
                );
            })}
        </ul>
    );
};

export default AnswerList;