import {Api} from "../../../shared/api";
import {IFileTypes, requestData} from "../../../shared/type/CompetitionType";
import confirmAlert from "../../../shared/lib/ConfirmAlert";



export default function FetchAddCompetition(requestData:requestData, files:IFileTypes[]) {
    const blob:Blob = new Blob([JSON.stringify(requestData)], {type: "application/json"})
    const formData: FormData = new FormData();
    formData.append("requestData", blob)
    for (let i:number = 0; i < files.length; i++) {
        formData.append("requestFiles", files[i].object)
    }

    return Api.post("/v1/api/competition/add-competition-info", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        confirmAlert("success", "대회등록이 완료되었습니다.")
            .then(res => {
                if (res.isConfirmed) window.location.href = "/competition";
            })
    })
        .catch(err => {
            console.log(err)
            if (err.response.data.detailMessage === "제목을 입력해주세요.")
                confirmAlert("warning", "제목을 입력해주세요.");
            else if (err.response.data.detailMessage === "종별을 선택해주세요.")
                confirmAlert("warning", "종별을 1개 이상 선택해주세요");
            else if (err.response.data.detailMessage === "시작일을 입력해주세요." || err.response.data.detailMessage === "종료일을 입력해주세요.")
                confirmAlert("warning", "시작일 또는 종료일을 선택해주세요.");
            else if (err.response.data.detailMessage === "장소를 등록해주세요.")
                confirmAlert("warning", "장소를 등록해주세요.");
        })
}