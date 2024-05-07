import {Api} from "../../../shared/api";
import {competitionResultList} from "../../../shared/type/CompetitionResultType";



export default function FetchAddResult(requestData:competitionResultList[], id:string):void {
    Api.post(`/v1/api/competition/add-result/${id}`, requestData)
        .then(res => {
        alert("대회결과 등록이 완료되었습니다.")
        window.location.href = `/competition/${id}`;
    })
        .catch(err => {
            console.log(err)
            if (err.response.data.detailMessage === "스테이지를 입력해주세요.") alert("스테이지를 입력해주세요.");
            if (err.response.data.detailMessage === "종별을 입력해주세요.") alert("종별을 입력해주세요.");
            if (err.response.data.detailMessage === "HOME 팀명을 입력해주세요." || "AWAY 팀명을 입력해주세요.") alert("팀명을 입력해주세요.");
            if (err.response.data.detailMessage === "점수는 0점 이상입니다.") alert("점수는 0점 이상입니다.");
            if (err.response.data.detailMessage === "점수는 200점 이하입니다.") alert("점수는 200점 이하입니다.");
            if (err.response.data.detailMessage === "시작일을 입력해주세요.") alert("시작일을 입력해주세요.");
        })
}