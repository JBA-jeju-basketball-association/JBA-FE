import {NormalApi} from "../../../shared/api";
import confirmAlert from "../../../shared/lib/ConfirmAlert";

export default function FetchCompetitionInfo(id:string|undefined) {
    if (id) {
        return NormalApi.get(`/v1/api/competition/detail/${id}`)
            .catch(err => {
                if (err.response.data.detailMessage === "해당 아이디와 일치하는 대회를 찾을 수 없습니다." || err.response.data.detailMessage === "대회 조회가 불가능합니다.")
                    confirmAlert("warning", "대회를 찾을 수 없습니다.")
                        .then(res => {
                            if (res.isConfirmed) window.location.href = "/competition"
                        })
            })
    }
}