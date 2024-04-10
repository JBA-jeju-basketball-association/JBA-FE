import React from "react"
import { SignupForm } from "features/signup/ui/SignUpForm"
import  Style from './SignUpPage.module.css'





export default function SignUpPage(){

    return(
        <div className={Style.SignUpPage} >
            <div className={Style.Title}>회원가입</div>
            <SignupForm></SignupForm>
        </div>
    )

}
