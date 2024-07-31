import {Api} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";

export default function FetchDeleteCompetition(id:string) {
    return Api.delete(`/v1/api/competition/delete/${id}`)
        .then(res=> {
            if (res.data.code === 200) {
                confirmAlert("success", "대회가 삭제되었습니다.")
                    .then(res => {
                        window.location.href = "/competition"
                    })
            }
        }).catch(err => {
            confirmAlert("error", "대회 삭제 중 오류가 발생했습니다.", "관리자에게 문의해주세요.")
        })
}