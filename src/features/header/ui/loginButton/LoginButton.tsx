import React from 'react';
import style from "./LoginButton.module.css"
import useUserStore from "../../../../app/hocs/UserStore";
import {useNavigate} from "react-router-dom";
import fetchLogout from "../../api/FetchLogout";
const LoginButton = () => {
    const {AccessToken, setAccessToken, setRefreshToken} = useUserStore();
    const navigate = useNavigate();

    const loginButtonHandler = ():void => {
        if (AccessToken === null) {
            navigate("/login")
        }else {
            fetchLogout(AccessToken, setAccessToken,setRefreshToken, navigate)
        }
    }
    return (
        <button className={style.LoginButton} onClick={()=> loginButtonHandler()}>
            {AccessToken === null ? "로그인" : "로그아웃"}
        </button>
    );
};

export default LoginButton;