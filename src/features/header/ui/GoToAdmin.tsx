import React from 'react';
import style from "./GoToAdmin.module.css";
import {useNavigate} from "react-router-dom";

export const GoToAdmin = () => {
    const navigate = useNavigate()
    return (
        <button lang={"en"} className={style.AdminButton} onClick={() => navigate("/admin")}>
            Admin
        </button>
    );
};
