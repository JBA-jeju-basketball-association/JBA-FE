import {Api} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/ConfirmAlert";

export default function FetchUpdateProfile(data:{name:string,phoneNum:string, birth:string, team:string}) {
    Api.put("/v1/api/user/update", data)
        .then(res => {
            if (res.status === 200) {
                confirmAlert("success", "프로필 수정 성공", "프로필 수정이 완료되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.reload();
                    })
            }
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "비어 있을 수 없습니다") confirmAlert("warning", "프로필 수정 실패", "빈칸을 모두 채워주세요.")
            else if (message === "휴대폰번호 유효성 검사 실패") confirmAlert("warning", "휴대폰번호를 정확히 입력해주세요.")
            else if (message === "주민번호 유효성 검사 실패") confirmAlert("warning", "주민번호를 정확히 입력해주세요.")
            else if (message === "이미 해당 휴대폰 번호로 가입된 유저가 있습니다.") confirmAlert("warning", "이미 가입된 휴대폰번호입니다.")
        })

}