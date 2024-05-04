import React from 'react';
import {LoginButton,SignUpButton} from "../../../features/header";
import style from "./Header.module.css"
import {useUserStore} from "../../../shared/model";

export const Header = () => {
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
