import React from 'react';
import LoginButton from "../../features/header/ui/loginButton/LoginButton";
import SignUpButton from "../../features/header/ui/signUpButton/SignUpButton";
import style from "./Header.module.css"
import useUserStore from "../hocs/UserStore";

const Header = () => {
    const {AccessToken} = useUserStore();
    return (
        <div>
            <div className={style.Header}>
                <LoginButton/>
                {AccessToken === null ? <SignUpButton/> : ""}
            </div>
        </div>
    );
};

export default Header;