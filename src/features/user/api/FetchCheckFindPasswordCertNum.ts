import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";

export default function FetchCheckFindPasswordCertNum(email:string, authNum:number|null, setSuccessCert: React.Dispatch<React.SetStateAction<boolean>>) {
    const data = {email,authNum};
    NormalApi.post("v1/api/mail/check-auth-num", data)
        .then(res => {
            if (res.status === 200) {
                setSuccessCert(true);
            }
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "인증 번호를 입력해 주세요.") confirmAlert("warning", "인증 번호를 입력해 주세요.")
            else if (message === "잘못된 인증 번호 입니다.") confirmAlert("warning", "잘못된 인증 번호 입니다.")
        })
}