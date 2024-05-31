import {Api} from "../../../shared/api";
import {competitionResultList} from "../../../shared/type/CompetitionType";
import confirmAlert from "../../../shared/lib/ConfirmAlert";



export default function FetchUpdateResult(requestData:competitionResultList[], id:string) {
    requestData.forEach(result => result.competitionResult.forEach(item => item.startTime = new Date(new Date(item.startTime).getTime() - (new Date(item.startTime).getTimezoneOffset() * 60000))))
    const requestDataFinal:{requests:competitionResultList[]} = {requests:requestData}
    return Api.put(`/v1/api/competition/update-result/${id}`, requestDataFinal)
        .then(res => {
            if (res.status === 200){
                confirmAlert("success", "대회결과 수정이 완료되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.href = `/competition/${id}`;
                    });
            }
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