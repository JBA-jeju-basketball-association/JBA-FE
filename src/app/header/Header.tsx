import React from 'react';
import LoginButton from "../../features/header/ui/loginButton/LoginButton";
import SignUpButton from "../../features/header/ui/signUpButton/SignUpButton";
import style from "./Header.module.css"
import useUserStore from "../hocs/UserStore";
import MenuBar from 'entities/MenuBar/ui/MenuBar';
import Logo from 'shared/ui/Logo/Logo';

const Header = () => {
    const {token} = useUserStore();
    return (
        <div>
            <div className={style.Header}>
                <LoginButton/>
                {token === null ? <SignUpButton/> : ""}
       
            </div>
            <MenuBar></MenuBar>
        </div>

    );
};

export default Header;