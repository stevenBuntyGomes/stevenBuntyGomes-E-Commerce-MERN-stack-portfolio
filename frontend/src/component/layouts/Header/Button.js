import { style } from '@mui/system';
import React from 'react'
import './Button.css'

const styles = [
    'btn--primary',
    'btn--outline',
];

const size = [
    'btn--medium',
    'btn--large',
];

export const Button = ({
    children,
    type,
    onclick,
    buttonStyle,
    buttonSize,
}) => {
    const checkButtonStyle = styles.includes(buttonStyle) ? buttonStyle : style[0];
    const checkButtonSize = size.includes(buttonSize) ? buttonSize : size[0];

    return (
        <button className = {`btn ${checkButtonStyle} ${checkButtonSize}`}
            onClick = {onclick} type = {type}
        >
            {children}
        </button>
    )
};
