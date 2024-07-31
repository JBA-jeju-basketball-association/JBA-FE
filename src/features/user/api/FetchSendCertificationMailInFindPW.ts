import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";

export default function FetchSendCertificationMailInFindPW(name:string, birth: number | null, email:string, certificationNum:number | null, setSendMail: React.Dispatch<React.SetStateAction<boolean>>) {
    const certificationData = {name, birth, email};
    NormalApi.post("v1/api/user/post/checkUserInfo", certificationData)
        .then(res => {
            if (res.status === 200) {
                setSendMail(true);
                NormalApi.post("v1/api/mail/find-password-send-mail", {email})
            }
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "비어 있을 수 없습니다") confirmAlert("warning", "인증 실패", "빈칸을 모두 채워주세요.")
            else if (message === "생년월일은 8자리입니다.") confirmAlert("warning", "생년월일은 8자리입니다.")
            else if (message === "유저를 찾을 수 없습니다.") confirmAlert("warning", "해당 정보와 일치하는 회원이 없습니다.")
            else if (message === "올바른 형식의 이메일 주소여야 합니다") confirmAlert("warning", "이메일 형식을 확인해주세요.")
        })
}