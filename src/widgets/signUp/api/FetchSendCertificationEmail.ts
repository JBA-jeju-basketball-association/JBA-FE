import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";


export default function FetchSendCertificationEmail(email:string, setCertificating:React.Dispatch<React.SetStateAction<boolean>>) {
    const emailRequest:{ email: string} = {email}
    return NormalApi.get(`v1/api/sign/check-email?email=${email}`)
        .then(res => {
            if (res.status === 200) {
                confirmAlert("success", "인증번호 발송 완료", "인증번호 확인 부탁드립니다.")
                    .then(res => {
                        if (res.isConfirmed) setCertificating(true)

                    })
                NormalApi.post("v1/api/mail/sign-up-send-mail", emailRequest)
                    .catch(err => {
                        const message = err.response.data.detailMessage;
                        if (message === "이메일을 입력해주세요.") confirmAlert("warning", "이메일을 입력해주세요.")
                        else if (message === "이메일 형식을 확인해주세요.") confirmAlert("warning", "이메일 형식을 확인해주세요.")
                        else if (message === "이메일 형식을 확인해주세요.") confirmAlert("warning", "이미 가입된 이메일입니다.", err.response.data.request)
                    })
            }
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 409) confirmAlert("warning", "이미 가입된 이메일입니다.")
        })


}