import {Api} from "../../../shared/api";
import {competitionResultList} from "../../../shared/type/CompetitionType";
import confirmAlert from "../../../shared/lib/ConfirmAlert";



export default function FetchAddResult(requestData:competitionResultList[], id:string):void {
    Api.post(`/v1/api/competition/add-result/${id}`, requestData)
        .then(res => {
        alert("대회결과 등록이 완료되었습니다.")
        window.location.href = `/competition/${id}`;
    })
        .catch(err => {
            if (err.response.data.detailMessage === "스테이지를 입력해주세요.")
                confirmAlert("warning", "스테이지를 입력해주세요.")
            if (err.response.data.detailMessage === "종별을 입력해주세요.")
                confirmAlert("warning", "종별을 입력해주세요.")
            if (err.response.data.detailMessage === "HOME 팀명을 입력해주세요." || err.response.data.detailMessage === "AWAY 팀명을 입력해주세요.")
                confirmAlert("warning", "팀명을 입력해주세요.")
            if (err.response.data.detailMessage === "점수는 0점 이상입니다.")
                confirmAlert("warning", "점수는 0점 이상입니다.")
            if (err.response.data.detailMessage === "점수는 200점 이하입니다.")
                confirmAlert("warning", "점수는 200점 이하입니다.")
            if (err.response.data.detailMessage === "시작일을 입력해주세요.")
                confirmAlert("warning", "시작일을 입력해주세요.")
        })
}