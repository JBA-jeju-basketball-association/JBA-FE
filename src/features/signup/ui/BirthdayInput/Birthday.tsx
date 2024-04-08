import React from "react" 
import Dob from "./DayOfBirthday";
import { BirthdayType,BirthdayKey } from "features/signup/api/type";
import style from"./Birthday.module.css"



export default function Birthday({setInputData}:{setInputData:(data:string)=>void}){
  const birthday:BirthdayType ={
  year: "",
  month: "",
  day: "",};
  
  function changeUserBirthday(type:BirthdayKey, value: string ) {
    birthday[type]=value;
    let birthdayData=[]
    for (const key in birthday) {
      birthdayData.push(birthday[key]);
    }
    setInputData(birthdayData.join("-"))
  }

   
  return(
  <div  className={style.Input_birthday}>
    <Dob type={"year"} changeUserBirthday={changeUserBirthday}></Dob>
    <Dob type={"month"} changeUserBirthday={changeUserBirthday}></Dob>
    <Dob type={"day"} changeUserBirthday={changeUserBirthday}></Dob>
  </div>

  )
  }

  