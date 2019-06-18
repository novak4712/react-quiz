import React from 'react';
import classes from './BackDrope.module.css';

const BackDrope = (props) => {
    return (
        <div
            className={classes.BackDrope}
            onClick={props.onClick}
        />
    );
};
export default BackDrope;