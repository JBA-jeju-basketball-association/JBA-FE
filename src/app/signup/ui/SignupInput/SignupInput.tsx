import React, { useState, useEffect } from "react" 
import checkloginInPutData from"../../checkloginInPutData"
import style from"./SignupInput.module.css"

type Key ="email"|"password"|"passwordConfirm"|"name"|"phoneNum"|"team"|"birthday"|"gender"


type Props={
    icon?:string;
    type:Key;
    placeholder?:string;
    changeSingupForm:(type: Key, value: string | "MALE" | "FEMALE" | "")=>void;
}



export default function SignupInput({icon,type,placeholder,changeSingupForm}:Props){
  const loginInputData: [RegExp, string, string] = checkloginInPutData(type);
  const regex: RegExp = loginInputData[0];
  const isTrue: string = loginInputData[1];
  const isFalse: string = loginInputData[2];   
  const[inputData,setInputData]=useState("")
  const[toggle,setToggle]=useState(false)
  const[guideline,setGuideline]=useState(false)
  

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
                    <div  className={style.SignupInput_iconbox}>
                        <img  src={icon} alt="x" />
                    </div>
                    {type==="gender"?<SelectGender handleClick={handleClick} toggle={toggle} inputData={inputData}></SelectGender>:
                    <input type={type==="password"? "password":"string"}placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>}
                </div>
                <div className={style.SignupInput_guideline}>{guideline?isTrue:isFalse}</div>
          </div>
              );
  }
  
  
  
  
  
  
  function SelectGender({handleClick,toggle,inputData}:{handleClick:(event: React.MouseEvent<HTMLInputElement>)=>void,toggle:boolean,inputData:string}){
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
      <button onClick={()=>{console.log()}}></button>
     </div>
    )
  }

  