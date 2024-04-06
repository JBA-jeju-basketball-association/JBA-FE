import React,{useState} from "react" 
import style from"./SignupInput.module.css"
import sendEmailApi from "features/signup/api/sendEmailApi"
import checkEmailCodeApi from 'features/signup/api/checkEmailCodeApi';



export default function CheckEmail ({inputData,clickCheckEmail,isConfirmedEmail}:{inputData:string,clickCheckEmail:()=>void,isConfirmedEmail:(data:boolean)=>void}){
//  const[checkedEmail,setCheckedEmail]=useState(false)
 const[checkingEmail,setCheckingEmail]=useState(false)
 const[authNum,setAuthNum]=useState("")

 //이메일 인증하기 클릭시
 function checkEmail(){
  //이메일 인증번호 입력란 보이기
  setCheckingEmail(!checkingEmail)
  //이메일 인증번호 보내기 api 
  sendEmailApi(inputData)
  //이메일 입력란 지우기
  clickCheckEmail()
 }

 //이메일 재작성하기 클릭시
 function changeEmail(){
   //이메일 인증번호 입력란 지우기
  setCheckingEmail(!checkingEmail);
  //이메일 입력란 보이기
  clickCheckEmail();
  //이메일
 }

 //인증번호 입력시 
 function changeAuthNum(event:React.ChangeEvent<HTMLInputElement>){
  setAuthNum(event.target.value)
  
 }

//인증번호 확인버튼 누를시 
 function checkEmailCode(){
  checkEmailCodeApi(inputData,authNum,isConfirmedEmail)
 }


    return(
      <div >
        {checkingEmail? 
          <div className={style.SignupInput_checkCode}>
            <div className={style.SignupInput_checkCode_changeCode}  onClick={()=>{changeEmail()}}> 이메일 재작성 하기</div>
            <input className={style.SignupInput_checkCode_codeInput}  onChange={(e)=>{changeAuthNum(e)}} placeholder="인증번호를 입력하세요."></input> 
            <div className={style.SignupInput_checkCode_button}>
             <div onClick={()=>{checkEmailCode()}}>확인</div>
            </div>
          </div>
        : 
        <div className={style.SignupInput_checkEmail} onClick={()=>{checkEmail()}}>이메일 인증</div>
        }
      </div>)
    
  }