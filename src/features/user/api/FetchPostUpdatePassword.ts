import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";

export default function FetchPostUpdatePassword(pw:string, confirmPw:string, certificationNum:number | null, email:string) {
    const data = {
        password: pw,
        confirmPassword: confirmPw,
        certificationNum: certificationNum,
        email: email
    }
    return NormalApi.put("v1/api/user/update/password-in-findPassword", data)
        .then(res => {
            if (res.status === 200) {
                confirmAlert("success", "비밀번호 변경 완료", "비밀번호 변경이 완료되었습니다. \n 다시 로그인해주세요.")
                    .then(res => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    })
            }
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "비어 있을 수 없습니다") confirmAlert("warning", "비밀번호 변경 실패", "빈칸을 모두 채워주세요.")
            else if (message === "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호는 영문과 특수문자 숫자를 포함하며 8자 이상 20자 이하여야 합니다.")
            else if (message === "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호에 특수문자는 !@#$^*+=-만 사용 가능합니다.")
            else if (message === "비밀번호와 비밀번호 확인이 같지 않습니다.") confirmAlert("warning", "비밀번호 오류", "비밀번호와 비밀번호 확인이 같지 않습니다.")
            else if (message === "인증번호가 맞지 않습니다.") {
                confirmAlert("warning", "인증번호가 맞지 않습니다.")
                    .then(res => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
            }
            else if (message === "인증번호가 만료되었습니다.") {
                confirmAlert("warning", "인증번호가 만료되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) {
                            window.location.reload();
                        }
                    });
            }

        })
}