import React from "react" 
import {SignupInput} from "./SignupInput/SignupInput";
// import signUpApi from"../api/signUpApi"
import styles from"./SignupFrom.module.css"
import { SignupFormDataType,SignupFormDataKey } from "../api/type";


  //api에 사용될 값
const signupFormData:SignupFormDataType={
  email: "",
  password: "",
  passwordConfirm: "",
  name: "",
  phoneNum: "",
  team:"",
  birthday:"",
  gender: ""};


export function SignupForm(){



  // //제출 버튼을 눌렀을 경우 모든 항목의 값이 있다면 (각 항목에서 통과된 데이터만 입력될 수 있음) api실행 아니라면 alert로 안내
  // function isSignupFormDataValid(data: SignupFormDataType) {
  //   //signupFormData 각 항목의 값이 null이나""인지 확인함 모두 통과시 api 실행
  //   for (const key in data) {
  //       if (data[key as keyof SignupFormDataType] === null || data[key as keyof SignupFormDataType] === "") {
  //           alert("입력값을 확인하세요.")}
  //           //return을 넣어 항목이 비어있는게 있다면 해당 함수 중지
  //           return
  //   }
  //   signUpApi(data)
  //   console.log("실행")

  // }


//signupFormData를 바꿀 수 있는 함수-> 각 항목에서 정규식표현값이 true경우 사용
  function changeSignupForm(type: SignupFormDataKey, value: string| "MALE" | "FEMALE" | "") {
    // gender인 경우 별도로 처리
    if (type === "gender") {
        signupFormData["gender"] = value as "MALE" | "FEMALE" | "";
    } else{
      signupFormData[type] = value 
    }
  }

  return(
  <div className={styles.SignupForm}>
          <SignupInput type={"email"} changeSignupForm={changeSignupForm} placeholder={"이메일"}></SignupInput>
          <SignupInput type={"password"} changeSignupForm={changeSignupForm} placeholder={"비밀번호"}></SignupInput>
          <SignupInput type={"name"} changeSignupForm={changeSignupForm} placeholder={"이름"}></SignupInput>
          <SignupInput type={"phoneNum"} changeSignupForm={changeSignupForm} placeholder={"000-0000-0000"}></SignupInput>
          <SignupInput type={"team"} changeSignupForm={changeSignupForm} placeholder={"소속팀"}></SignupInput>
          <SignupInput type={"gender"} changeSignupForm={changeSignupForm} placeholder={"소속팀"}></SignupInput>
          <SignupInput type={"birthday"} changeSignupForm={changeSignupForm} placeholder={"소속팀"}></SignupInput>
          {/* <button onClick={()=>isSignupFormDataValid(signupFormData)}> 확인 테스트</button> */}
           <button onClick={()=>console.log(signupFormData)}> 확인 테스트</button> 


  </div>
  );
};

