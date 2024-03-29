import React from 'react'

import classes from './Select.module.css';

export const Select = (props) => {
    const htmlFor = `${props.label}-${Math.random()}`;
    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <select
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                { props.options.map((option, idx)=>{
                    return(
                        <option
                            key={option.value+idx}
                            value={option.value}
                        >{option.text}</option>
                    )
                })}
            </select>
        </div>
    );
};
