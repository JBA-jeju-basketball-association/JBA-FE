import React from 'react';
import style from "./Header.module.css"
import MenuBar from 'entities/MenuBar/ui/MenuBar';
import {useUserStore} from "../../shared/model";
import {LoginButton, SignUpButton} from "../../features/header";
import {useNavigate} from "react-router-dom";

const Header = () => {
    const {AccessToken} = useUserStore();
    const navigate = useNavigate();
    return (
        <div>
            <div className={style.Header}>
                <div className={style.JBA} onClick={() => navigate("/")}>
                    <p lang={"en"}>JBA</p>
                </div>
                <div className={style.buttonArea}>
                    <LoginButton/>
                    {AccessToken === null ? <SignUpButton/> : ""}
                </div>
            </div>
            <MenuBar></MenuBar>
        </div>

    );
};

export default Header;