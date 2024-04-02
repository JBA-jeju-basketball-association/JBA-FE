import React, { useState, useEffect } from "react" 
import checkloginInPutData from"../../checkloginInPutData"
import style from"./SignupInput.module.css"

type Key ="email"|"password"|"passwordConfirm"|"name"|"phoneNum"|"team"|"birthday"|"gender"


interface Props{
    icon?:string;
    type:Key;
    placeholder?:string;
    changeSingupForm:(type: Key, value: string | "MALE" | "FEMALE" | "")=>void;
}

export  function SignupInput({icon,type,placeholder,changeSingupForm}:Props){
  const loginInputData: [RegExp, string, string] = checkloginInPutData(type);
  const regex: RegExp = loginInputData[0];
  const isTrue: string = loginInputData[1];
  const isFalse: string = loginInputData[2];   
  const[inputData,setInputData]=useState("")
  const[toggle,setToggle]=useState(false)
  const[guideline,setGuideline]=useState(false)
  const[passwordConfirm,setPasswordConfirm]=useState(false)

  useEffect(()=>{
    setInputData((currentValue) => currentValue);
    if (!regex.test(inputData)){
      setGuideline(false)
      changeSingupForm(type,"")
    }else{ setGuideline(true)
      changeSingupForm(type,inputData)
    }},
    
    [inputData,regex,type,changeSingupForm])



    function handleChange (event: React.ChangeEvent<HTMLInputElement>){
      setInputData(event.target.value)
  
    }

    function PasswordConfirmhandleChange (event: React.ChangeEvent<HTMLInputElement>){
      if (inputData===event.target.value){
        setPasswordConfirm(true)
        changeSingupForm("passwordConfirm",event.target.value)
      }else{setPasswordConfirm(false)
        changeSingupForm("passwordConfirm","")
      }
  
    }


    function handleClick (event: React.MouseEvent<HTMLInputElement>){
      setToggle(!toggle);
      if(inputData===event.currentTarget.value){
        setInputData("")
      }else{
       setInputData(event.currentTarget.value)
      }
      }




      return(
          <div className={style.SignupInput}>
                <div  className={style.SignupInput_inputBox}>
                    <div  className={style.SignupInput_iconBox}>
                        <img  src={icon} alt="x" />
                    </div>
                    {
                    // type 값이 gender 일 떄
                    type==="gender"?(<SelectGender handleClick={handleClick} inputData={inputData}></SelectGender>):


                    // type 값이 password 일 떄
                    type==="password"?
                    <input type="password" placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>:


                    // type 값이 team 일 떄
                    type==="team"?(
                      <>
                    <input type="string"placeholder={placeholder} onChange={(e)=>{handleChange(e)}} value={inputData}></input>
                    <div className={style.SignupInput_input_team_checkbox}>
                    <input type="checkbox" id="team" value="무소속" onClick={(e)=>{handleClick(e)}} checked={inputData==="무소속"?true:false} />
                    <label htmlFor="team">무소속</label>
                    </div>
                    </>):
                    // type 값이 그외 일 때
                    type==="birthday"?(
                    <UserBirthday ></UserBirthday>):
                    // type 값이 그외 일 때
                    <input type="string"placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>
                    }


                </div>
                    <div className={style.SignupInput_guideline}>{guideline?isTrue:isFalse}</div>
            { // type 값이 password 일 떄 비밀번호 확인 작성란 추가
            type==="password"?
               <>
                <div className={style.SignupInput_inputBox}>
                    <div  className={style.SignupInput_iconBox}>
                         <img  src={icon} alt="x" />
                    </div>
                    <input type="password" placeholder={guideline?"비밀번호 재입력":"올바른 비밀번호를 입력해주세요."} onChange={(e)=>{PasswordConfirmhandleChange(e)}} disabled={guideline?false:true} ></input>
                </div>
                    <div className={style.SignupInput_guideline}>{passwordConfirm?"입력하신 비밀번호와 일치합니다.":"입력하신 비밀번호와 동일하게 입력하세요."}</div></>:""}
          </div>
              );
  }
  
  
  
  
  
  
  function SelectGender({handleClick,inputData}:{handleClick:(event: React.MouseEvent<HTMLInputElement>)=>void,inputData:string}){
    return(
    <div  className={style.SignupInput_input_gender}>
      <div className={style.SignupInput_input_gender_checkbox}>
        <input type="checkbox" id="MALE" value="MALE" name="gender" onClick={(e)=>{handleClick(e)
        } } checked={inputData==="MALE"?true:false} />
        <label htmlFor="MALE">남자</label>
        </div>
        <div className={style.SignupInput_input_gender_checkbox}>
        <input type="checkbox" id="FEMALE" value="FEMALE" name="gender"  onClick={(e)=>{handleClick(e)}} checked={inputData==="FEMALE"?true:false} />
        <label htmlFor="FEMALE">여자</label>
      </div>
     </div>
    )
  }







  interface Birthday {
    year: string;
    month: string;
    day: string;
  }
  
  type Key2 = keyof Birthday;
  
  function UserBirthday() {
    const birthday={
      year: "",
      month: "",
      day: ""
    };
  
    function changeUserBirthday(type: Key2, value: string ) {
      birthday[type] = value;;
    }


  

    return(
    <div  className={style.SignupInput_input_birthday}>
      <Dob type={"year"} changeUserBirthday={changeUserBirthday}></Dob>
      <Dob type={"month"} changeUserBirthday={changeUserBirthday}></Dob>
      <Dob type={"day"} changeUserBirthday={changeUserBirthday}></Dob>
      <button onClick={()=>{console.log(birthday)}}></button>
    </div>

    )
  }

  function Dob({type,changeUserBirthday}:{type:"year"|"month"|"day",changeUserBirthday:(type: Key2, value: string)=>void;}){

    const[inputData,setInputData]=useState("")
    const [regex] = checkloginInPutData(type);
 


    function handleChange(event:React.ChangeEvent<HTMLInputElement>){
      setInputData(event.target.value)
    }

    useEffect(()=>{
      if(Number(inputData)<0){
        alert("올바른 날짜를 입력하세요! 음수는 올 수 없습니다.")
        setInputData("")
      }else{
      if (!regex.test(inputData)){
        changeUserBirthday(type,"")
        console.log(type,inputData)
      }else{
        changeUserBirthday(type,inputData)
        console.log("dd",type,inputData)

      }}},
      [inputData,regex,type,changeUserBirthday])

    return(
      <div className={style.SignupInput_input_Dob}>
        <div className={`${style.SignupInput_input_Dob_inputBox} ${style[type]}`}>
          <input type="number"  placeholder={type==="year"?"⦁⦁⦁⦁":"⦁⦁"}  value={inputData} onChange={(e)=>{handleChange(e)} }/>
          <div>{type}</div>
        </div>
       </div>
    )
  }