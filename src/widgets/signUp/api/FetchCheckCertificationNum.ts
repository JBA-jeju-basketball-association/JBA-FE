import React from "react";
import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";


export default function FetchCheckCertificationNum(email:string, num:string, setCertificating:React.Dispatch<React.SetStateAction<boolean>>, setIsCertificate:React.Dispatch<React.SetStateAction<boolean>>) {
    const emailCheckRequest:{email:string, authNum:string} = {email:email, authNum:num}
    return NormalApi.post("/v1/api/mail/check-auth-num", emailCheckRequest)
        .then(res => {
            confirmAlert("success", "인증 완료", "인증번호 확인이 완료되었습니다.")
                .then(res => {
                    if (res.isConfirmed) {
                        setCertificating(false);
                        setIsCertificate(true)
                    }
                })
        }).catch(err => {
            const message = err.response.data.detailMessage;
            if (message === "이메일을 입력해주세요.") confirmAlert("warning", "이메일을 입력해주세요.")
            else if (message === "이메일 형식을 확인해주세요.") confirmAlert("warning", "이메일 형식이 잘못되었습니다.")
            else if (message === "잘못된 인증 번호 입니다.") confirmAlert("warning", "인증 실패", "이메일과 인증번호를 확인해주세요")
        })
}