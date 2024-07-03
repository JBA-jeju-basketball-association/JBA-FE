import React from "react";
import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/ConfirmAlert";


export default function FetchCheckCertificationNum(email:string, num:string) {
    const emailCheckRequest:{email:string, authNum:string} = {email:email, authNum:num}
    return NormalApi.post("/v1/api/mail/check-auth-num", emailCheckRequest)

}