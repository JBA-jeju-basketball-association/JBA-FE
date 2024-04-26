import React from 'react';
import {LoginButton,SignUpButton} from "../../../features/header";
import style from "./Header.module.css"
import {useUserStore} from "../../../shared/model";
import {useNavigate} from "react-router-dom";

export const Header = () => {
    const {AccessToken} = useUserStore();
    const navigate = useNavigate();
    return (
        <div>
            <div className={style.Header}>
                {/*임시 홈버튼*/}
                <div>
                    <button onClick={()=>navigate("/main")} className={style.home}>홈으로</button>
                </div>
                <div>
                    <LoginButton/>
                    {AccessToken === null ? <SignUpButton/> : ""}
                </div>

            </div>
        </div>
    );
};
