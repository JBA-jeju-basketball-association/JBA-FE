import {Api} from "../../../shared/api";
import {postCompetitionSchedule} from "../../../shared/type/CompetitionType";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";


export default function FetchUpdateSchedule(id:string, postCompetitionScheduleList:postCompetitionSchedule[]) {
    const request:{request: postCompetitionSchedule[]} = {request: postCompetitionScheduleList}
    return Api.put(`/v1/api/competition/update/schedule/${id}`, request)
        .then(res => {
            if (res.status === 200) {
                confirmAlert("success", "대회일정수정이 완료되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.href = `/competition/${id}`;
                    })
            }
        }).catch(err => {
            const errMessage:string = err.response.data.detailMessage
            if (errMessage === "스테이지를 입력해주세요.")
                confirmAlert("warning", "floor를 입력해주세요.");
            else if (errMessage === "종별을 입력해주세요.")
                confirmAlert("warning", "종별을 입력해주세요.");
            else if (errMessage === "HOME 팀명을 입력해주세요.")
                confirmAlert("warning", "HOME 팀명을 입력해주세요.");
            else if (errMessage === "AWAY 팀명을 입력해주세요.")
                confirmAlert("warning", "AWAY 팀명을 입력해주세요.");
            else if (errMessage === "시작일을 입력해주세요.")
                confirmAlert("warning", "시작일을 입력해주세요.");
            else if (errMessage === "경기 번호가 없습니다.")
                confirmAlert("warning", "경기 번호가 없습니다.");
            else if (errMessage === "장소를 입력해주세요.")
                confirmAlert("warning", "장소를 입력해주세요.");
            else if (errMessage === "5대5 경기여부를 입력해주세요.")
                confirmAlert("warning", "5대5 경기여부를 입력해주세요.");
            else if (errMessage === "대회를 찾을 수 없습니다.")
                confirmAlert("warning", "대회를 찾을 수 없습니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.href = "/competition"
                    })
            else if (errMessage === "일정등록 단계가 아닙니다.")
                confirmAlert("warning", "일정이 등록된 단계가 아닙니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.href = `/competition/${id}`
                    })

        })
}