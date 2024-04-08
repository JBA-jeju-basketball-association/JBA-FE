import React from 'react';
import style from "./LoginButton.module.css"
import useUserStore from "../../../../app/hocs/UserStore";
import {useNavigate} from "react-router-dom";
import fetchLogout from "../../api/FetchLogout";
const LoginButton = () => {
    const {token, setToken} = useUserStore();
    const navigate = useNavigate();

    const loginButtonHandler = ():void => {
        if (token === null) {
            navigate("/login")
        }else {
            fetchLogout(token, setToken, navigate)
        }
    }
    return (
        <button className={style.LoginButton} onClick={()=> loginButtonHandler()}>
            {token === null ? "로그인" : "로그아웃"}
        </button>
    );
};

export default LoginButton;