import {Api} from "../../../shared/api";
import {IFileTypes, requestData} from "../type/type";



export default function FetchAddCompetition(requestData:requestData, files:IFileTypes[]) {
    const blob:Blob = new Blob([JSON.stringify(requestData)], {type: "application/json"})
    const formData: FormData = new FormData();
    formData.append("requestData", blob)
    for (let i:number = 0; i < files.length; i++) {
        formData.append("requestFiles", files[i].object)
    }

    Api.post("/v1/api/competition/add-competition-info", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => {
        alert("대회 등록이 완료되었습니다.")
        window.location.href = "/main";
    })
        .catch(err => {
            console.log(err)
            if (err.response.data.detailMessage === "제목을 입력해주세요.") alert("제목을 입력해주세요.");
            if (err.response.data.detailMessage === "종별을 선택해주세요.") alert("종별을 1개 이상 선택해주세요");
            if (err.response.data.detailMessage === "시작일을 입력해주세요." || "종료일을 입력해주세요.") alert("시작일 또는 종료일을 선택해주세요.");
            if (err.response.data.detailMessage === "장소를 등록해주세요.") alert("장소를 등록해주세요.");
            // if (err.response.data.detailMessage === "제목은 3글자 이상이고 특수문자를 포함할 수 없습니다.") alert("제목은 3글자 이상이고 특수문자를 포함할 수 없습니다.");
        })
}