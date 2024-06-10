import React, {useEffect, useState} from 'react';
import {LoginInput, LoginLabel, PageTitle} from "../../../shared/ui";
import style from "./LoginPage.module.css";
import fetchLogin from "../api/FetchLogin";
import {useUserStore, WhiteLogo} from "../../../shared/model";
import {Link} from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [emailMessage, setEmailMessage] = useState<string>("");
    const {AccessToken, setAccessToken, setRefreshToken} = useUserStore();
    const submitHandler = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        setEmailMessage("");
        fetchLogin(email, password, setEmailMessage, setAccessToken,setRefreshToken);
    }

    useEffect(() => {
        if (AccessToken) {
            window.location.href = "/main"
        }
    }, []);


    return (
        <div className={style.LoginPage}>
            <div className={style.overlay}>
                <div className={style.centerBox}>
                    <div className={style.logoArea}>
                        <div className={style.logoAreaOverlay}>
                            <WhiteLogo/>
                            <div className={style.logoBar}></div>
                            <p className={style.hiContent}>반갑습니다!</p>
                            <p className={style.welcomeContent}>회원님의 방문을</p>
                            <p className={style.welcomeContent}>진심으로 환영합니다.</p>
                        </div>
                    </div>
                    <div className={style.loginArea}>
                        <PageTitle pageName={"로그인"}/>
                        <form noValidate className={style.formBox} onSubmit={(e) => submitHandler(e)}>
                            <div className={style.boxArea}>
                                <LoginLabel name={"이메일"}/>
                                <LoginInput type={"email"} setFn={setEmail}/>
                            </div>
                            <div className={style.messageBox}>
                                <p className={style.message}>
                                    {emailMessage}
                                </p>
                            </div>

                            <div className={style.boxArea}>
                                <LoginLabel name={"비밀번호"}/>
                                <LoginInput type={"password"} setFn={setPassword}/>
                            </div>
                            <div className={style.searchBox}>
                                <Link to="/" className={style.search}>아이디 | 비밀번호 찾기 &gt;</Link>
                            </div>
                            <button type="submit" className={style.submitButton}>로그인</button>
                            <div className={style.loginBottomLine}></div>
                            <Link to="/signup" className={style.signUpLink}>회원가입</Link>
                        </form>
                    </div>
                </div>


            </div>
        </div>

    );
};
