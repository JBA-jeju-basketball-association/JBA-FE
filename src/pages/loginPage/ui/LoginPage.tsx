import React, {useEffect, useState} from 'react';
import PageTitle from "../../../shared/ui/pageTitle/PageTitle";
import style from "./LoginPage.module.css";
import fetchLogin from "../api/FetchLogin";
import useUserStore from "../../../app/hocs/UserStore";
import {Link} from "react-router-dom";

const LoginPage = () => {
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
            <PageTitle pageName={"로그인"}/>
            <form noValidate className={style.formBox} onSubmit={(e) => submitHandler(e)}>
                <div className={style.boxArea}>
                    <div className={style.labelArea}>
                        <label>이메일</label>
                    </div>
                    <div className={style.inputArea}>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className={style.messageBox}>
                    <p className={style.message}>
                        {emailMessage}
                    </p>
                </div>

                <div className={style.boxArea}>
                    <div className={style.labelArea}>
                        <label>비밀번호</label>
                    </div>
                    <div className={style.inputArea}>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className={style.searchBox}>
                    <Link to="/" className={style.search}>아이디 | 비밀번호 찾기 &gt;</Link>
                </div>
                <button type="submit" className={style.submitButton}>로그인</button>
                <div className={style.loginBottomLine}></div>
                <Link to="/signup" className={style.signUpLink}>회원가입</Link>
            </form>
        </div>
    );
};

export default LoginPage;