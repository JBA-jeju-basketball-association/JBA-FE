import {Api} from "../../../shared/api";
import {IFileTypes, updateRequestData} from "../../../shared/type/CompetitionType";
import confirmAlert from "../../../shared/lib/ConfirmAlert";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";



export default function FetchUpdateCompetition(id:string, requestData:updateRequestData, files:IFileTypes[]) {
    const blob:Blob = new Blob([JSON.stringify(requestData)], {type: "application/json"})
    const formData: FormData = new FormData();
    formData.append("requestData", blob)
    for (let i:number = 0; i < files.length; i++) {
        formData.append("requestFiles", files[i].object)
    }

    return Api.post(`/v1/api/competition/update-competition-info/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        confirmAlert("success", "대회수정이 완료되었습니다.")
            .then(res => {
                // if (res.isConfirmed) window.location.href = "/main";
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
            else if (err.response.data.detailMessage === "해당 종별은 결과가 이미 입력되어 있어 삭제가 불가능합니다.")
                confirmAlert("warning", DivisionOptions.filter(item => item.value === err.response.data.request)[0].label +  " 종별은 이미 결과가 있어 삭제가 불가능합니다.", "대회 결과를 먼저 수정해주세요.");
        })
}