import React from 'react';
import style from "./Header.module.css"
import MenuBar from 'entities/MenuBar/ui/MenuBar';
import {useUserStore} from "../../shared/model";
import {LoginButton, SignUpButton} from "../../features/header";

const Header = () => {
    const {AccessToken} = useUserStore();
    return (
        <div>
            <div className={style.Header}>
                <LoginButton/>
                {AccessToken === null ? <SignUpButton/> : ""}

            </div>
            <MenuBar></MenuBar>
        </div>

    );
};

export default Header;