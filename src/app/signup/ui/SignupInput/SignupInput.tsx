import React, { useState } from "react" 
import checkloginInPutData from"../../checkloginInPutData"
import style from"./SignupInput.module.css"



type Props={
    icon?:string;
    type:string;
    placeholder?:string;
    changeSingupForm:(type: string, value: string)=>void;
}



export default function SignupInput({icon,type,placeholder,changeSingupForm}:Props){

    const [regex,isTrue,IsFalse]:[RegExp,string,string]=checkloginInPutData(type)
    const[inputData,setInputData]=useState("")
    const[guideline,setGuideline]=useState(IsFalse)
    
    function handleChange (event: React.ChangeEvent<HTMLInputElement>){
      setInputData(event.target.value)
      if( !regex.test(inputData)){
        changeGuideline(IsFalse)
        changeSingupForm(type,"")
      }else{
        changeGuideline(isTrue)
        changeSingupForm(type,inputData)
      }
  
    }
  
    function changeGuideline(e:string){
      setGuideline(e)
    }
    
      return(
          <div className={style.SignupInput}>
                <div  className={style.SignupInput_input}>
                    <div  className={style.SignupInput_iconbox}>
                        <img  src={icon} alt="x" />
                    </div>
                    <input type="string" placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>
                </div>
                <div className={style.SignupInput_guideline}>{guideline}</div>
          </div>
              );
  }
  
  
  
  
  
  
 