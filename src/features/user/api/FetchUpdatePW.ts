import {Api} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/ConfirmAlert";


export default function FetchUpdatePW(data:{prevPW:string, newPW:string, newPWConfirm:string}, setAccessToken:(token:string | null) =>void) {
    console.log(data)
    Api.put("/v1/api/user/update/password", data)
        .then(res => {
            if (res.status === 200) {
                confirmAlert("success", "비밀번호 변경 완료", "다시 로그인해주세요.")
                    .then(res => {
                        setAccessToken(null);
                        if (res.isConfirmed) window.location.href = "/login";
                    })
            }
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "비어 있을 수 없습니다") confirmAlert("warning", "빈칸을 모두 채워주세요.")
            else if (message === "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.")
            else if (message === "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.")
            else if (message === "비밀번호와 비밀번호 확인이 같지 않습니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호와 비밀번호 확인이 같지 않습니다.")
            else if (message === "자격 증명에 실패하였습니다.") confirmAlert("warning", "현재 비밀번호가 맞지 않습니다.")
        })

}