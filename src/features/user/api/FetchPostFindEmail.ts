import {NormalApi} from "../../../shared/api";
import {findEmailRequest} from "../ui/SearchEmailBox";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";


export default  function FetchPostFindEmail(data:findEmailRequest, setFoundEmail: React.Dispatch<React.SetStateAction<string>>) {
    return NormalApi.post("v1/api/user/post/findEmail", data)
        .then(res => {
            if (res.status === 200) setFoundEmail(res.data.data);
        })
        .catch(err => {
            const message = err.response.data.detailMessage
            if (message === "비어 있을 수 없습니다") confirmAlert("warning", "이메일 찾기 실패", "빈칸을 모두 채워주세요.")
            else if (message === "휴대폰번호 유효성 검사 실패") confirmAlert("warning", "휴대폰번호를 정확히 입력해주세요.")
            else if (message === "생년월일은 8자리입니다.") confirmAlert("warning", "생년월일은 8자리입니다.")
            else if (message === "유저를 찾을 수 없습니다.") confirmAlert("warning", "해당 정보와 일치하는 회원이 없습니다.")
        })
}