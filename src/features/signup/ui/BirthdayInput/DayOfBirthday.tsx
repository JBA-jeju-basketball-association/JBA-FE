import React, { useState, useEffect} from "react" 
import checkloginInPutData from"../../lib/checkloginInPutData"
import style from"./Birthday.module.css"
import { BirthdayKey } from "features/signup/api/type";



export default function Dob({type,changeUserBirthday}:{type:BirthdayKey,changeUserBirthday:(type: BirthdayKey, value: string)=>void;}){

  const[inputData,setInputData]=useState("")
  const[isOkay,setIsOkay]=useState("true")
  const [regex] = checkloginInPutData(type);



  function handleChange(event:React.ChangeEvent<HTMLInputElement>){
    // 입력값에서 숫자만 추출하여 새로운 값으로 설정
    const newValue = event.target.value.replace(/\D/g, '');
    let newValueLimited =""
    if(type==="year"){
        // 4자리만 남기도록 잘라냄
      newValueLimited = newValue.slice(0, 4);
    }else{
        // 2자리만 남기도록 잘라냄
      newValueLimited = newValue.slice(0, 2);
    }
    // 새로운 값 설정
    setInputData(newValueLimited);
  }

  useEffect(()=>{
    if(Number(inputData)<0){
      alert("올바른 날짜를 입력하세요! 음수는 올 수 없습니다.")
      setInputData("")
    }else if(inputData===""){
      setIsOkay("true")
    }else{
    if (regex.test(inputData)){
      changeUserBirthday(type,inputData)
      setIsOkay("true")
    }else{
      changeUserBirthday(type,"")
      setIsOkay("false")
    }}},
    [inputData,regex,type,changeUserBirthday])

  return(
      <div className={`${style.Input_dob} ${style[type]}  ${style[isOkay]}`}>
        <input type="number"  placeholder={type==="year"?"⋅⋅⋅⋅":"⋅⋅"}  maxLength={type==="year"?4:2} value={inputData} onChange={(e)=>{handleChange(e)} }/>
        <div>{type}</div>
      </div>
      )
}
