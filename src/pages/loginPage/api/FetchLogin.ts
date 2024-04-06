import {api} from "../../../app/hocs/api";
import React from "react";

export default function fetchLogin (email:string, password:string, setEmailMessage: React.Dispatch<React.SetStateAction<string>>):void {
    api.post("/v1/api/sign/login", {
        email,
        password
    }).then(res => {
        if (res.status === 200) {
            localStorage.setItem("AccessToken", res.headers["access-token"]);
            localStorage.setItem("RefreshToken", res.headers["refresh-token"]);
            window.location.href = "/main"
        }
    }).catch(err => {
        const data = err.response.data;
        // 이메일 유효성 검사
        if (err.response.status === 400 && data.request === "email") setEmailMessage(data.detailMessage);
        else if (data.detailMessage === "Not Found User") setEmailMessage("이메일을 확인해주세요.");

        //틀린 비밀번호 입력 시 alert
        else if (data.detailMessage === "자격 증명에 실패하였습니다.") alert(`비밀번호를 ${data.request.failureCount}회 틀렸습니다. (5회 실패시 계정 잠금)`)
        else if (data.detailMessage === "자격 증명에 실패하였습니다. 계정이 잠깁니다.") alert("비밀번호를 5회 잘못 입력하셨습니다. 계정이 잠깁니다.")
        else if (data.detailMessage === "Login Locked User") alert("잠긴 계정입니다.")
    });
}