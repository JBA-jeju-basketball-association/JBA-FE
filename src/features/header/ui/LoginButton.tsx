import React from 'react';
import style from "./LoginButton.module.css"
import {useNavigate} from "react-router-dom";
import fetchLogout from "../api/FetchLogout";
import {useUserStore} from "../../../shared/model";
export const LoginButton = () => {
    const {AccessToken, setAccessToken} = useUserStore();
    const navigate = useNavigate();

    const loginButtonHandler = ():void => {
        if (AccessToken === null) {
            navigate("/login")
        }else {
            fetchLogout(AccessToken, setAccessToken, navigate)
        }
    }
    return (
        <button className={style.LoginButton} onClick={()=> loginButtonHandler()}>
            {AccessToken === null ? "로그인" : "로그아웃"}
        </button>
    );
};
