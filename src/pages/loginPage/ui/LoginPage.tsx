import React, {useEffect, useState} from 'react';
import {CheckBox, LoginInput} from "../../../shared/ui";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

import style from "./LoginPage.module.css";
import fetchLogin from "../api/FetchLogin";
import {useUserStore, WhiteLogo} from "../../../shared/model";
import {Link} from "react-router-dom";
import {getCookie, setCookie} from "../../../utils/cookie/cookie";
import {SearchAccountModal} from "../../../features/user";

export const LoginPage = () => {
    const [email, setEmail] = useState<string>(getCookie("savedEmail" || ""));
    const [password, setPassword] = useState<string>("");
    const [emailMessage, setEmailMessage] = useState<string>("");
    const {AccessToken, setAccessToken} = useUserStore();
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    const [isChecked, setIsChecked] = useState<boolean>(!!getCookie('savedEmail'));
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const submitHandler = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        setEmailMessage("");
        fetchLogin(email, password, setEmailMessage, setAccessToken, isChecked, setCookie);
    }

    useEffect(() => {
        if (AccessToken) {
            window.location.href = "/"
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
                        <div className={style.title}>로그인</div>
                        <form noValidate className={style.formBox} onSubmit={(e) => submitHandler(e)}>
                            <div className={style.labelArea}>
                                <label>이메일</label>
                            </div>
                            <div className={style.boxArea}>
                                <LoginInput type={"email"} setFn={setEmail} placeholder={""} value={email}/>
                            </div>
                            <div className={style.messageBox}>
                                <p className={style.message}>
                                    {emailMessage}
                                </p>
                            </div>

                            <div className={style.labelArea}>
                                <label>비밀번호</label>
                            </div>
                            <div className={style.boxArea}>
                                <LoginInput type={isHidePassword ? "password" : "text"} setFn={setPassword}
                                            placeholder={""} value={password}/>
                                {isHidePassword ?
                                    <VscEye className={style.openEye} onClick={() => setIsHidePassword(false)}/>
                                    :
                                    <VscEyeClosed className={style.openEye} onClick={() => setIsHidePassword(true)}/>
                                }
                            </div>
                            <div className={style.checkBoxArea}>
                                <CheckBox isChecked={isChecked} setIsChecked={setIsChecked} content={"이메일 기억하기"}/>
                            </div>
                            <button type="submit" className={style.submitButton}>로그인</button>
                            <Link to="/signup" className={style.signUpLink}>회원가입</Link>
                        </form>
                        <div className={style.searchBox}>
                            <button className={style.search} onClick={() => setIsModalOpen(true)}>계정 찾기 | 비밀번호 찾기
                            </button>
                        </div>
                        <SearchAccountModal isModalOpen={isModalOpen} setModalOpen={setIsModalOpen}/>
                    </div>
                </div>
            </div>
        </div>

    );
};
