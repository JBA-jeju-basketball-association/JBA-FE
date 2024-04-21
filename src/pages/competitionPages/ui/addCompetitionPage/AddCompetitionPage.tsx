import * as React from 'react';
import PageTitle from "../../../../shared/ui/pageTitle/PageTitle";
import style from "./AddCompetitionPage.module.css"
import {useState} from "react";
import AddCompetitionLabel from "../../../../shared/ui/addCompetitionLabel/AddCompetitionLabel";
import Select, {MultiValue} from "react-select";
import makeAnimated from "react-select/animated";
import CustomDatePicker from "../../../../shared/ui/datepicker/CustomDatePicker";
import PlaceArea from "../../../../entities/competition/ui/PlaceArea";
import AddFiles from "../../../../features/competition/ui/addFiles/AddFiles";
import CkEditor from "../../../../shared/ui/ckEditor/CkEditor";
import Api from "../../../../app/hocs/Api";
import useUserStore from "../../../../app/hocs/UserStore";


export type place = {
    name : string;
    address: string;
    latitude?: number | null;
    longitude?: number | null;
}

type value = {
    label: string;
    value: string;
}

type requestData = {
    title: string;
    divisions: string[];
    startDate: Date | null;
    endDate: Date | null;
    places: place[];
    relatedURL: string | null;
    ckData:any;
    realCkImgs:string[];
}

export type IFileTypes = {
    id: number;
    object: File;
}


const AddCompetitionPage = () => {
    const {AccessToken} = useUserStore();
    const [title, setTitle] = useState<string>("")
    const [divisions, setDivisions] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [places, setPlaces] = useState<place[]>([]);
    const [relatedURL, setRelatedUrl] = useState<string | null>(null);
    const [files, setFiles] = useState<IFileTypes[]>([]);
    const [ckData, setCkData] = useState<string>("");
    const [ckImgUrls, setCkImgUrls] = useState<string[]>([]); //TODO: 나중에 s3 파일 삭제요청때 쓸 예정.


    const divisionHandler = (values:MultiValue<any>):void => {
        setDivisions([])
        values.map(
            (item:value):void => {
                setDivisions(prevState => [...prevState,item.value])
            }
        )
    }
    const options: { value: string, label: string; }[] = [
        {value: "element", label: "초등"},
        {value: "middle", label: "중등"},
        {value: "high", label: "고등"},
        {value: "university", label: "대학"},
        {value: "division3", label: "디비전3"},
        {value: "division4", label: "디비전4"},
        {value: "forties", label: "40대"},
        {value: "rookie", label: "루키"},
    ];

    console.log("ckImgUrls",ckImgUrls)
    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>):void => {
        event.preventDefault()
        const requestData:requestData = {
            title: title,
            divisions: divisions,
            startDate: startDate,
            endDate: endDate,
            places: places,
            relatedURL: relatedURL,
            ckData:ckData,
            realCkImgs:[]
        }

        for (let i:number = 0; i < ckImgUrls.length; i++) {
            if(ckData.includes(ckImgUrls[i])) {
                requestData.realCkImgs.push(ckImgUrls[i])
            }
        }
        console.log("real",requestData.realCkImgs)

        const blob:Blob = new Blob([JSON.stringify(requestData)], {type: "application/json"})
        const data: FormData = new FormData();
        data.append("requestData", blob)
        for (let i:number = 0; i < files.length; i++) {
            data.append("requestFiles", files[i].object)
        }
        Api.post("/v1/api/competition/add-competition-info", data, {
            headers: {
                "AccessToken": AccessToken,
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            alert("대회 등록이 완료되었습니다.")
            window.location.href = "/main";
        })
            .catch(err => {
                console.log(err)
                if (err.response.data.detailMessage === "제목을 입력해주세요.") alert("제목을 입력해주세요.");
                if (err.response.data.detailMessage === "종별을 선택해주세요.") alert("종별을 선택해주세요");
                if (err.response.data.detailMessage === "시작일을 입력해주세요.") alert("시작일 또는 종료일을 선택해주세요.");
                if (err.response.data.detailMessage === "종료일을 입력해주세요.") alert("시작일 또는 종료일을 선택해주세요.");
                if (err.response.data.detailMessage === "장소를 등록해주세요.") alert("장소를 등록해주세요.");
            })
    }


    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회등록"/>
            <form className={style.container} onSubmit={(e: React.FormEvent<HTMLFormElement>) => formSubmitHandler(e)}>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"대회명"} height={"normal"}/>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                           type={"text"}
                           className={style.titleInput}
                           placeholder="대회명을 입력해주세요"
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"종별"} height={"normal"}/>
                    <Select
                        components={makeAnimated()}
                        options={options}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        placeholder={"선택"}
                        className={style.select}
                        onChange={(values: MultiValue<any>) => divisionHandler(values)}
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"날짜"} height={"normal"}/>
                    <CustomDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                      setEndDate={setEndDate}/>
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"장소"} height={"double"}/>
                    <PlaceArea places={places} setPlaces={setPlaces}/>
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"URL"} height={"normal"}/>
                    <input type="text"
                           placeholder="대회 관련 URL을 입력해주세요"
                           className={style.urlInput}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRelatedUrl(e.target.value)}
                    />
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"첨부파일"} height={"double"}/>
                    <AddFiles files={files} setFiles={setFiles}/>
                </div>
                <div className={style.CkEditorTitle}>
                    <p>내용</p>
                </div>
                <div className={style.CkEditor}>
                    <CkEditor setCkData={setCkData} setCkImgUrls={setCkImgUrls}/>
                </div>
                <button type={"submit"} className={style.submitButton}>등록</button>
            </form>
        </div>
    );
}

export default AddCompetitionPage;