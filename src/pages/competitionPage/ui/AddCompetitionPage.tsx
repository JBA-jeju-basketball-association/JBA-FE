import * as React from 'react';
import style from "./AddCompetitionPage.module.css"
import {useEffect, useState} from "react";
import Select, {MultiValue} from "react-select";
import makeAnimated from "react-select/animated";
import {CustomDatePicker} from "../../../features/datepicker";
import {PlaceArea,AddFiles} from "../../../features/competition";
import {AddCompetitionLabel, PageTitle} from "../../../shared/ui";
import {CkEditor} from "../../../features/ckEditor";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";
import FetchAddCompetition from "../api/FetchAddCompetition";
import {IFileTypes, place, requestData, value} from "../../../shared/type/CompetitionType";
import { useBeforeunload } from 'react-beforeunload';




export const AddCompetitionPage = () => {
    const [title, setTitle] = useState<string>("")
    const [divisions, setDivisions] = useState<string[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [places, setPlaces] = useState<place[]>([]);
    const [relatedURL, setRelatedUrl] = useState<string | null>(null);
    const [files, setFiles] = useState<IFileTypes[]>([]);
    const [ckData, setCkData] = useState<string>("");
    const [ckImgUrls, setCkImgUrls] = useState<string[]>([]); //TODO: 나중에 s3 파일 삭제요청때 쓸 예정.
    const [success, setSuccess] = useState<boolean>(false);


    const divisionHandler = (values:MultiValue<any>):void => {
        setDivisions([])
        values.map(
            (item:value):void => {
                setDivisions(prevState => [...prevState,item.value])
            }
        )
    }


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
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
        FetchAddCompetition(requestData, files);

    }
    const preventClose = (e: BeforeUnloadEvent) => {
        e.preventDefault();
        e.returnValue = "ㅗㅗㅗㅗ";
    }

    useEffect(() => {
            window.addEventListener("beforeunload", preventClose);

            return () => {
                if (!success) {
                    window.removeEventListener("beforeunload", preventClose);
                }
            };
        }

        , []);




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
                        options={DivisionOptions}
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
