import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import style from "./SignUpForm.module.css"
import FetchSendCertificationEmail from "../api/FetchSendCertificationEmail";
import FetchCheckCertificationNum from "../api/FetchCheckCertificationNum";
import confirmAlert from "../../../shared/lib/ConfirmAlert";

type FormData = {
    email: string;
    password: string;
    passwordConfirm: string;
    name: string;
    phoneNum: string;
    team: string;
    birth: number;
    gender: string;
    isCertificate: boolean;
}



export const SignUpForm = () => {
    const [certificating, setCertificating] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(300);
    const [certificationNum, setCertificationNum] = useState<string>("");
    const {register, setValue, handleSubmit, formState:{ errors}, getValues} = useForm<FormData>({defaultValues:{isCertificate: false}});
    const onSubmit = handleSubmit(data => {
        console.log("submit")
        console.log(data)
    })

    const sendEmailHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setTimeLeft(299)
        FetchSendCertificationEmail(getValues("email"), setCertificating)
    }

    const confirmCertificationNumHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        FetchCheckCertificationNum(getValues("email"), certificationNum)
            .then(res => {
                confirmAlert("success", "인증 완료", "인증번호 확인이 완료되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) {
                            setCertificating(false);
                            setValue("isCertificate", true)
                        }
                    })
            }).catch(err => {
                const message = err.response.data.detailMessage;
                if (message === "이메일을 입력해주세요.") confirmAlert("warning", "이메일을 입력해주세요.")
                else if (message === "이메일 형식을 확인해주세요.") confirmAlert("warning", "이메일 형식이 잘못되었습니다.")
                else if (message === "잘못된 인증 번호 입니다.") confirmAlert("warning", "인증 실패", "이메일과 인증번호를 확인해주세요")
            })
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
                <input {...register("email")} type={"email"} disabled={getValues("isCertificate")} className={getValues("isCertificate") ? style.checkedEmail : ""}/>
                {!getValues("isCertificate") &&
                    <button className={style.confirmBtn} onClick={(e) => sendEmailHandler(e)}>{certificating ? "인증번호 재발송" : "인증번호 발송"}</button>
                }
            </div>
            {certificating &&
                <div className={style.authNumArea}>
                    <input type={"text"} maxLength={6} onChange={(e) => {setCertificationNum(e.target.value)}} placeholder={"인증번호 6자리"}/>
                    <div>
                        <p>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
                        <button onClick={(e) => confirmCertificationNumHandler(e)} className={style.confirmBtn}>인증번호 확인</button>
                    </div>
                </div>
            }

            <label>비밀번호</label>
            <div>
                <input {...register("password")}/>
            </div>

            <label>비밀번호 확인</label>
            <div>
                <input {...register("passwordConfirm")}/>
            </div>

            <label>이름</label>
            <div>
                <input {...register("name")}/>
            </div>

            <label>휴대폰 번호</label>
            <div>
                <input {...register("phoneNum")}/>
            </div>

            <label>소속팀</label>
            <div>
                <input {...register("team")}/>
            </div>

            <label>주민번호 앞 7자리</label>
            <div>
                <input {...register("birth")}/>
            </div>
            <button onSubmit={() => onSubmit} className={style.submitBtn}>회원가입</button>
        </form>
    );
};
