import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import style from "./SignUpForm.module.css"
import FetchSendCertificationEmail from "../api/FetchSendCertificationEmail";
import FetchCheckCertificationNum from "../api/FetchCheckCertificationNum";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";
import {VscEye, VscEyeClosed} from "react-icons/vsc";
import PhoneNumHandler from "../model/PhoneNumHandler";
import BirthHandler from "../model/BirthHandler";
import FetchSignUp from "../api/FetchSignUp";

export type FormData = {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNum: string;
    team: string;
    birth: string;
}



export const SignUpForm = () => {
    const [certificating, setCertificating] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(300);
    const [isCertificate, setIsCertificate] = useState<boolean>(false)
    const [certificationNum, setCertificationNum] = useState<string>("");
    const [isHidePassword, setIsHidePassword] = useState<boolean>(true);
    const [isHidePasswordConfirm, setIsHidePasswordConfirm] = useState<boolean>(true);
    const {register, setValue, handleSubmit, formState:{ errors}, getValues} = useForm<FormData>();


    const onSubmit = handleSubmit(data => {
        if (!isCertificate) confirmAlert("warning", "인증 미완료", "이메일 인증을 진행해주세요")
        else {
            FetchSignUp(data)
        }
    })

    const sendEmailHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTimeLeft(300)
            FetchSendCertificationEmail(getValues("email"), setCertificating);
    }

    const confirmCertificationNumHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        FetchCheckCertificationNum(getValues("email"), certificationNum, setCertificating, setIsCertificate)

    }

    useEffect(() => {
        let timer:any;
        if (certificating && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevState => prevState - 1);
            }, 1000)
        }else if(timeLeft === 0) {
            clearInterval(timer)
        }
        return () => clearInterval(timer)
    }, [certificating, timeLeft]);




    return (
        <form onSubmit={onSubmit} className={style.SignUpForm}>
            <label>이메일</label>
            <div>
                <input {...register("email")}
                       type={"email"} disabled={isCertificate}
                       className={isCertificate ? style.checkedEmail : ""}
                />
                {!isCertificate ?
                    <button className={style.confirmBtn}
                            onClick={(e) => sendEmailHandler(e)}>{certificating ? "인증번호 재발송" : "인증번호 발송"}</button>
                    :
                    <p className={style.confirmBtn}>인증완료</p>
                }
            </div>
            {certificating &&
                <div className={style.authNumArea}>
                    <input type={"text"}
                           maxLength={6}
                           onChange={(e) => {
                        setCertificationNum(e.target.value)
                    }} placeholder={"인증번호 6자리"}/>
                    <div>
                        <p>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
                        <button onClick={(e) => confirmCertificationNumHandler(e)} className={style.confirmBtn}>인증번호
                            확인
                        </button>
                    </div>
                </div>
            }

            <label>비밀번호</label>
            <div>
                <input type={isHidePassword ? "password" : "text"} {...register("password")} />
                {isHidePassword ?
                    <VscEye className={style.openEye} onClick={() => setIsHidePassword(false)}/>
                    :
                    <VscEyeClosed className={style.openEye} onClick={() => setIsHidePassword(true)}/>
                }
            </div>

            <label>비밀번호 확인</label>
            <div>
                <input type={isHidePasswordConfirm ? "password" : "text"} {...register("passwordConfirm")} />
                {isHidePasswordConfirm ?
                    <VscEye className={style.openEye} onClick={() => setIsHidePasswordConfirm(false)}/>
                    :
                    <VscEyeClosed className={style.openEye} onClick={() => setIsHidePasswordConfirm(true)}/>
                }
            </div>


            <label>이름</label>
            <div>
                <input {...register("name")} type={"text"}/>
            </div>

            <label>휴대폰 번호</label>
            <div>
                <input {...register("phoneNum")} type={"text"}
                       onChange={(e) => PhoneNumHandler(e, setValue)}/>
            </div>

            <label>소속팀</label>
            <div>
                <input {...register("team")} placeholder={"소속팀이 없을 경우 '무소속' 입력해주세요"} type={"text"}/>
            </div>

            <label>주민번호 앞 7자리</label>
            <div>
                <input {...register("birth")} type={"text"}
                       onChange={(e) => BirthHandler(e, setValue)}/>
            </div>

            <button onSubmit={() => onSubmit} className={style.submitBtn}>회원가입</button>
        </form>
    );
};
