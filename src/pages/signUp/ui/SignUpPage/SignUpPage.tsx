import React from "react"
import style from './SignUpPage.module.css'
import {WhiteLogo} from "../../../../shared/model";
import {SignUpForm} from "../../../../widgets/signUp";

export function SignUpPage(){

    return (
        <div className={style.SignUpPage}>
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
                    <div className={style.signUpArea}>
                        <div className={style.title}>회원가입</div>
                        <SignUpForm />
                    </div>
                </div>
            </div>
        </div>
    );

}
