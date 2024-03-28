import React, { useEffect, useState } from "react" 

// interface SignupForm {
//     email: string;
//     password: string;
//     passwordConfirm: string;
//     name: string;
//     phonenumber: string;
//     team: string;
//     birthday: string;
//     gender: string;
//   }
  




export function SignupForm(){
    const [signupForm,setSignupForm]=useState({
        email: "",
        password: "",
        passwordConfirm: "",
        name: "",
        phonenumber: "",
        team:"",
        birthday: "",
        gender: "",
    });

    function changeSingupForm(type: string, value: string) {
      setSignupForm(prev => ({
        ...prev,
        [type]: value 
      }));
    }
    useEffect(()=>{
      console.log(signupForm)
    },[signupForm])
    return(
    <div>
            <SignupInPut type={"email"} changeSingupForm={changeSingupForm}></SignupInPut>
            <SignupInPut type={"password"} changeSingupForm={changeSingupForm}></SignupInPut>
            <SignupInPut type={"name"} changeSingupForm={changeSingupForm}></SignupInPut>
            <SignupInPut type={"phoneNum"} changeSingupForm={changeSingupForm}></SignupInPut>
            <SignupInPut type={"team"} changeSingupForm={changeSingupForm}></SignupInPut>

    </div>
    );
};


type Props={
    cssModule?:string;
    icon?:string;
    type:string;
    placeholder?:string;
    changeSingupForm:(type: string, value: string)=>void;
}









function SignupInPut({icon,type,placeholder,cssModule,changeSingupForm}:Props){

  const [regex,isTrue,IsFalse]:[RegExp,string,string]=checkloginInPutData(type)
  const[inputData,setInputData]=useState("")
  const[guideline,setGuideline]=useState("")

  function handleChange (event: React.ChangeEvent<HTMLInputElement>){
    setInputData(event.target.value)
    if( regex.test(inputData)){
      changeGuideline(isTrue)
      changeSingupForm(type,inputData)
     
    }else{
      changeGuideline(IsFalse)
      changeSingupForm(type,"")
    }

  }

  function changeGuideline(e:string){
    setGuideline(e)
  }

    return(
        <div className={cssModule}>
            <div className="icon">
              <img  src={icon} alt="아이콘" />
            </div>
            <input type="string" placeholder={placeholder} onChange={(e)=>{handleChange(e)}}></input>
            <div style={{width:"50px",height:"20px"}}>{guideline}</div>
        </div>
            );
}






function checkloginInPutData(type: string): [RegExp, string, string] {
  let regex: RegExp = /[a-z]/; // 초기값으로 설정
  let isTrue: string = "";
  let isFalse: string = "";
    switch(type)
    {
      case "email": 
        regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;//이메일 형식확인
        isTrue="유효한 이메일 형식입니다.";
        isFalse="이메일 형식을 확인하세요."
      break;  
      case "password": 
        regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;;//숫자, 영문, 특수문자를 반드시 포함한 8~20자리의 비밀번호인지 확인
        isTrue="유효한 비밀번호 형식입니다.";
        isFalse="숫자, 영문, 특수문자를 반드시 포함한 8~20자리의 비밀번호를 입력해주세요. "
      break;
      case "name": 
      regex = /^[가-힣a-zA-Z]+$/;//영문 및 한글로 이루어져있는지 확인
      isTrue="";
      isFalse="이름을 정확히 입력해주세요."
      break;  
      case "phoneNum": 
      regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;//000-0000-0000 형식확인
      isTrue=""
      isFalse="올바른 휴대폰 형식이 아닙니다.."
      break; 
      case "gender": //MALE,FEMALE 둘중 하나의 값인지 확인
      regex = /^(MALE|FEMALE)$/;
      isTrue="";
      isFalse="성별을 체크해주세요."
      break;  
      case "team": 
      regex = /^\S+$/;//공백이 아닌 글씨로 시작하는지 확인
      isTrue="";
      isFalse="소속팀을 입력해주세요."
      break; 
      //비밀번호 확인과 생년월일은 제외하였습니다. 
      //비밀번호 확인은 사용자가 작성된 비밀번호와 비교하여야 하기에 정규표현식을 사용하기 알맞지 않고
      //생년월일의 경우 3가지 데이터르 동시에 확인하여야 하기에 따로 적합하지 않다고 생각하였습니다.
      //별도 작성예정
    }
  return [regex,isTrue,isFalse]
}
