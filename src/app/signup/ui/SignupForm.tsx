import React, { useEffect, useState } from "react" 
import SignupInput from "./SignupInput/SignupInput";
import styles from"./SignupFrom.module.css"


//타입 임시 작성
// interface SignupForm {
//     email: string;
//     password: string;
//     passwordConfirm: string;
//     name: string;
//     phonenumber: string;
//     team: string;
//     birthday: string;
//     gender: "MALE"|"FEMALE";
//   }
  




export function SignupForm(){
    const [signupForm,setSignupForm]=useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phonenumber: "",
        team:"",
        birthday: "",
        gender: "",
    });

    function changeSingupForm(type: string, value: string) {
      setSignupForm(prev => ({
        ...prev,
        [type]: value 
      }));
    }
    useEffect(()=>{
      console.log(signupForm)
    },[signupForm])
    return(
    <div className={styles.SignupForm}>
            <SignupInput type={"email"} changeSingupForm={changeSingupForm} placeholder={"이메일"}></SignupInput>
            <SignupInput type={"password"} changeSingupForm={changeSingupForm} placeholder={"비밀번호"}></SignupInput>
            <SignupInput type={"name"} changeSingupForm={changeSingupForm} placeholder={"이름"}></SignupInput>
            <SignupInput type={"phoneNum"} changeSingupForm={changeSingupForm} placeholder={"전화번호"}></SignupInput>
            <SignupInput type={"team"} changeSingupForm={changeSingupForm} placeholder={"소속팀"}></SignupInput>
    </div>
    );
};


//성별과 비밀번호 확인 input 컴포넌트 별도 구현
//팀 무소속시 무소속관련 토글버튼 구현