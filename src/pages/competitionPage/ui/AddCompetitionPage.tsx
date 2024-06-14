import * as React from 'react';
import style from "./AddCompetitionPage.module.css"
import {useState} from "react";
import Select, {MultiValue} from "react-select";
import makeAnimated from "react-select/animated";
import {CustomDatePicker} from "../../../features/datepicker";
import {PlaceArea,AddFiles} from "../../../features/competition";
import {AddCompetitionLabel, ListLinkBtn, PageTitle, RegitTitleInput} from "../../../shared/ui";
import {CkEditor} from "../../../features/ckEditor";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";
import {IFileTypes, requestData, value} from "../../../shared/type/CompetitionType";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";
import {place} from "../../../shared/type/CompetitionType";
import FetchAddCompetition from "../api/FetchAddCompetition";
import {useNavigate} from "react-router-dom";




export const AddCompetitionPage = () => {
    const [title, setTitle] = useState<string>("")
    const [divisions, setDivisions] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [places, setPlaces] = useState<place[]>([]);
    const [relatedURL, setRelatedUrl] = useState<string | null>(null);
    const [files, setFiles] = useState<IFileTypes[]>([]);
    const [ckData, setCkData] = useState<string>("");
    const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]); //TODO: 나중에 s3 파일 삭제요청때 쓸 예정.
    const [success, setSuccess] = useState<boolean>(false);
    const navigate = useNavigate();

    const divisionHandler = (values:MultiValue<any>):void => {
        setDivisions([])
        values.map(
            (item: value): void => {
                setDivisions(prevState => [...prevState, item.value])
            }
        )
    }

    const formSubmitHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
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

        for (let i:number = 0; i < newCkImgUrls.length; i++) {
            if(ckData.includes(newCkImgUrls[i])) {
                requestData.realCkImgs.push(newCkImgUrls[i])
            }
        }
        confirmAndCancelAlertWithLoading("question", "대회를 등록하시겠습니까?", "", async () => {
            await FetchAddCompetition(requestData, files)
        })
    }


    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회등록"/>
            <div className={style.listLinkArea}>
                <ListLinkBtn content={"목록"} linkFC={() => navigate("/competition")}/>
            </div>
            <div className={style.topBar}></div>
            <RegitTitleInput placeholder={"대회명을 입력해주세요."} title={title} setTitle={setTitle}/>
            <form className={style.containerBox}>
                <div className={style.competitionInputArea}>
                    <AddCompetitionLabel label={"종별"}/>
                    <Select
                        components={makeAnimated()}
                        options={DivisionOptions}
                        isMulti={true}
                        closeMenuOnSelect={false}
                        placeholder={"선택"}
                        className={style.select}
                        onChange={(values: MultiValue<any>) => divisionHandler(values)}
                    />
                </div>
                <div className={style.competitionInputArea}>
                    <AddCompetitionLabel label={"날짜"}/>
                    <CustomDatePicker startDate={startDate} setStartDate={setStartDate} endDate={endDate}
                                      setEndDate={setEndDate}/>
                </div>
                <div className={style.competitionInputArea2}>
                    <AddCompetitionLabel label={"장소"}/>
                    <PlaceArea places={places} setPlaces={setPlaces}/>
                </div>
                <div className={style.competitionInputArea}>
                    <AddCompetitionLabel label={"URL"}/>
                    <input type="text"
                           placeholder="대회 관련 URL을 입력해주세요"
                           className={style.urlInput}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRelatedUrl(e.target.value)}
                    />
                </div>
                <div className={style.competitionInputArea2}>
                    <AddCompetitionLabel label={"첨부파일"}/>
                    <AddFiles files={files} setFiles={setFiles}/>
                </div>
                <div className={style.CkEditorTitle}>
                    <p>내용</p>
                </div>
                <div className={style.CkEditor}>
                    <CkEditor ckData={ckData} setCkData={setCkData} setNewCkImgUrls={setNewCkImgUrls}/>
                </div>
            </form>
            <div className={style.bottomBar}></div>
            <ListLinkBtn content={"등록"} handleFC={(e)=>formSubmitHandler(e)} />
        </div>
    );
}
