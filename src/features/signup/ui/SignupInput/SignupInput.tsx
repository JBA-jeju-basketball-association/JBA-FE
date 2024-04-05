import React, { useState, useEffect} from "react" 
import checkloginInPutData from"../../checkloginInPutData"
import "shared/lib/resetInput.css"
import style from"./SignupInput.module.css"
import Birthday from "./Birthday"
import Gender from "./Gender"
import CheckEmail from "./CheckEmail"
import { Props } from "features/signup/api/type"



export  function SignupInput({icon,type,placeholder,changeSignupForm}:Props){
  //checkloginInPutData를 사용하여 각 type에 맞는 정규표현식과 가이드라인의 안내 문구들을 가져옵니다.
  const [regex, isTrue, isFalse] = checkloginInPutData(type) as [RegExp, string, string];
  const[inputData,setInputData]=useState("")
  const[guideline,setGuideline]=useState(false)

  //이메일 인증클릭시 이메일 작성란과 이메일 인증이 안보이도록 함, 다시 이메일 재작성 버튼 (CheckEmail 컴포넌트 내장))누를시 다시 나타남
  const[sendedEmail,setSendedEmail]=useState(false)
  const[emailConfirm,setEmailConfirm]=useState(false)

  //입력한 비밀번호와 비밀번호 재확인란이 동일한지에 대한 boolean값
  const[passwordConfirm,setPasswordConfirm]=useState(false)

  //input의 데이터 값이 바뀔 때 마다 정규식표현과 비교하여 가이드라인 내용을 바꾸고 최종 회원가입폼의 내용을 바꿔줍니다.
  useEffect(()=>{
    setInputData((currentValue) => currentValue);
    if (!regex.test(inputData)){
      setGuideline(false)
      changeSignupForm(type,"")
    }else if(type==="email"&&!emailConfirm){
      setGuideline(true)
    }else{
      setGuideline(true)
      changeSignupForm(type,inputData)
    }},
    [inputData,regex,type,emailConfirm,changeSignupForm,sendedEmail])


    //* 이메일 인증 클릭시 *
  function clickCheckEmail(){
    setSendedEmail(!sendedEmail)
  }

  function isConfirmedEmail(data:boolean){
    setEmailConfirm(data)
  }


  //* 패스워드 확인란 작성시  *
  function passwordConfirmhandleChange (event: React.ChangeEvent<HTMLInputElement>){
    //입려된 패스워드 값과 비교
     // 동일하다면
    if (inputData===event.target.value){
      //PasswordConfirm을 true로 바꾸어 PasswordConfirm관련 guideline을 바꿉니다.
      setPasswordConfirm(true)
      //최종 회원가입폼의 비밀번호 확인 데이터를 바꿔줍니다.
      changeSignupForm("passwordConfirm",event.target.value)

     // 틀리다면
    }else{
      //PasswordConfirm을 false로 바꾸어 PasswordConfirm관련 guideline을 바꿉니다.
      setPasswordConfirm(false)
      //최종 회원가입폼의 비밀번호 확인 데이터를 초기화 합니다.
      changeSignupForm("passwordConfirm","")
    }}


  //* 클릭시 * 기존 데이터와 동일하면 초기화 ,아닐시 state 데이터 입력
  function handleClick (event: React.MouseEvent<HTMLInputElement>){
    if(inputData===event.currentTarget.value){
      setInputData("")
    }else{
      setInputData(event.currentTarget.value)
    }}

  //+ 입력값 변동시 * state 데이터 입력
  function handleChange (event: React.ChangeEvent<HTMLInputElement>){
    setInputData(event.target.value)}

return(
    <div className={`${style.SignupInput} ${style.Input}`}>
      <div  className={`${style.SignupInput_inputBox} ${sendedEmail?style.None:style.Block}`}>
        <div  className={style.SignupInput_iconBox}>
            <img  src={icon} alt="x" />
        </div>
        {
        // type 값이 gender 일 떄
        type==="gender"?(<Gender handleClick={handleClick} inputData={inputData}></Gender>):
        
        // type 값이 email 일 떄
        type==="email"?(
         <> 
          <input type="string" id="email" placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>
          <CheckEmail inputData={inputData} clickCheckEmail={clickCheckEmail} isConfirmedEmail={isConfirmedEmail}></CheckEmail>
         </>
       ):


        // type 값이 password 일 떄
        type==="password"?
        <input type="password" placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>:


        // type 값이 team 일 떄
        type==="team"?(
         <>
        <input type="string"placeholder={placeholder} onChange={(e)=>{handleChange(e)}} value={inputData}></input>
        <div className={style.SignupInput_input_team_checkBox}>
        <input type="checkbox" id="team" value="무소속" onClick={(e)=>{handleClick(e)}} checked={inputData==="무소속"?true:false} />
        <label htmlFor="team">무소속</label>
        </div>
        </>):

        // type 값이 birthday 일 때
        type==="birthday"?(
        <Birthday  setInputData={(data)=>{setInputData(data)}}
        ></Birthday>):

        // type 값이 그외 일 때
        <input type="string"placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>
        }
        </div>



        {/* 가이드라인  */}
        <div  className={style.SignupInput_guideline_container} >
        <div className={`${style.SignupInput_guideline} ${guideline?style.isTrue:style.isFalse}`}>
          {guideline?isTrue:isFalse}
        </div>
        <div className={`${emailConfirm?style.isTrue:style.isFalse}`}>
          {emailConfirm===false&&type==="email"&&guideline?"이메일인증을 진행해주세요.":""}
        </div>
        </div>
       { // type 값이 password 일 떄 비밀번호 확인 작성란 추가
        type==="password"?
         <>
          <div className={style.SignupInput_inputBox}>
            <div  className={style.SignupInput_iconBox}>
                  <img  src={icon} alt="x" />
            </div>
            {/* guideline이 true일시 즉, 올바른 비밀번호가 입력될 때 사용가능하며, placeholder 값이 변합니다.*/}
            <input type="password" placeholder={guideline?"비밀번호 재입력":"올바른 비밀번호를 입력해주세요."} onChange={(e)=>{passwordConfirmhandleChange(e)}} disabled={guideline?false:true} ></input>
          </div>
          <div className={`${style.SignupInput_guideline} ${passwordConfirm?style.isTrue:""}`}>{passwordConfirm?"입력하신 비밀번호와 일치합니다.":"입력하신 비밀번호와 동일하게 입력하세요."}</div>
        </>:""}
    </div>
        );
  }
  
  
  
  
  
  






  