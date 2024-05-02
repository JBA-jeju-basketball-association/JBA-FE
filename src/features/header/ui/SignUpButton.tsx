import React from 'react';
import style from "./SignUpButton.module.css"
import {Link} from "react-router-dom";
export const SignUpButton = () => {
    return (
        <Link to="/signup" className={style.SignUpButton}>
            회원가입
        </Link>
    );
};