import React from 'react';
import style from "./Header.module.css"
import MenuBar from 'entities/MenuBar/ui/MenuBar';
import {useUserStore} from "../../../shared/model";
import {GoToAdmin, LoginButton, SignUpButton} from "../../../features/header";
import {useNavigate} from "react-router-dom";
import {JwtDecoder} from "../../../shared/lib";

export const Header = () => {
    const {AccessToken} = useUserStore();
    const navigate = useNavigate();
    return (
        <div>
            <div className={style.Header}>
                <div className={style.JBA} onClick={() => navigate("/")}>
                    <p lang={"en"}>JBA</p>
                </div>
                <div className={style.buttonArea}>
                    {AccessToken && (JwtDecoder(AccessToken).role === "ROLE_MASTER" || JwtDecoder(AccessToken).role === "ROLE_ADMIN") && <GoToAdmin />}
                    <LoginButton/>
                    {AccessToken === null ? <SignUpButton/> : ""}
                </div>
            </div>
            <MenuBar></MenuBar>
        </div>

    );
};
