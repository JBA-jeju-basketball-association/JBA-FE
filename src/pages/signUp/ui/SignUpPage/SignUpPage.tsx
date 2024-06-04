import React from "react"
import  Style from './SignUpPage.module.css'
import {SignupForm} from "../../../../features/signup/ui/SignupForm";





export default function SignUpPage(){

    return(
        <div className={Style.SignUpPage} >
            <div className={Style.Title}>회원가입</div>
            <SignupForm></SignupForm>
        </div>
    )

}
