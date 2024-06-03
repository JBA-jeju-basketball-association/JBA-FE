import React from "react" 
import style from"./Gender.module.css"


export default function Gender({handleClick,inputData}:{handleClick:(event: React.MouseEvent<HTMLInputElement>)=>void,inputData:string}){
    return(
    <div  className={style.input_gender}>
      <div className={style.input_gender_checkBox}>
        <input type="checkbox" id="MALE" value="MALE" name="gender" onClick={(e)=>{handleClick(e)
        } } checked={inputData==="MALE"?true:false} />
        <label htmlFor="MALE">남자</label>
        </div>
        <div className={style.input_gender_checkBox}>
        <input type="checkbox" id="FEMALE" value="FEMALE" name="gender"  onClick={(e)=>{handleClick(e)}} checked={inputData==="FEMALE"?true:false} />
        <label htmlFor="FEMALE">여자</label>
      </div>
     </div>
    )
  }
