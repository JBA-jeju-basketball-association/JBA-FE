import React from "react" 
import SignupInput from "./SignupInput/SignupInput";
import styles from"./SignupFrom.module.css"

  // type은 따로 관리예정입니다.


interface SignupFormData {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNum: string;
    team: string;
    birthday: string;
    gender: "MALE"|"FEMALE"|"";
  }
  
type Key ="email"|"password"|"passwordConfirm"|"name"|"phoneNum"|"team"|"birthday"|"gender"



export function SignupForm(){
    const signupFormData:SignupFormData={
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phoneNum: "",
        team:"",
        birthday: "",
        gender: ""};

  

    function changeSingupForm(type: Key, value: string | "MALE" | "FEMALE" | "") {
      // gender인 경우 별도로 처리
      if (type === "gender") {
          signupFormData["gender"] = value as "MALE" | "FEMALE" | "";
      } else {
          signupFormData[type] = value;
      }
    }

    return(
    <div className={styles.SignupForm}>
            <SignupInput type={"email"} changeSingupForm={changeSingupForm} placeholder={"이메일"}></SignupInput>
            <SignupInput type={"password"} changeSingupForm={changeSingupForm} placeholder={"비밀번호"}></SignupInput>
            <SignupInput type={"name"} changeSingupForm={changeSingupForm} placeholder={"이름"}></SignupInput>
            <SignupInput type={"phoneNum"} changeSingupForm={changeSingupForm} placeholder={"000-0000-0000"}></SignupInput>
            <SignupInput type={"team"} changeSingupForm={changeSingupForm} placeholder={"소속팀"}></SignupInput>
            <SignupInput type={"gender"} changeSingupForm={changeSingupForm} placeholder={"소속팀"}></SignupInput>
            <button onClick={()=>console.log(signupFormData)}> 확인 테스트</button>

    </div>
    );
};

