import * as React from 'react';
import style from "./UpdateCompetitionPage.module.css"
import {useEffect, useState} from "react";
import Select, {MultiValue} from "react-select";
import makeAnimated from "react-select/animated";
import {CustomDatePicker} from "../../../features/datepicker";
import {PlaceArea,UpdateFiles} from "../../../features/competition";
import {AddCompetitionLabel, PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {CkEditor} from "../../../features/ckEditor";
import {DivisionOptions, divisionType} from "../../../shared/model/DivisionOptions";
import FetchUpdateCompetition from "../api/FetchUpdateCompetition";
import {IFileTypes, updateRequestData, competitionDetailAttachedFile, place} from "../../../shared/type/CompetitionType";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import {useParams} from "react-router-dom";




export const UpdateCompetitionPage = () => {
    const {id} = useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => fetchCompetitionInfo(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
    })

    const [title, setTitle] = useState<string>("")
    const [selectedDivisions, setSelectedDivisions] = useState<{ value: string, label: string; }[]>([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [places, setPlaces] = useState<place[]>([]);
    const [relatedURL, setRelatedUrl] = useState<string | null>(null);
    const [files, setFiles] = useState<IFileTypes[]>([]);
    const [ckData, setCkData] = useState<string>("");
    const [attachedFileList, setAttachedFileList] = useState<competitionDetailAttachedFile[]>([])
    const [newCkImgUrls, setNewCkImgUrls] = useState<string[]>([]);


    const divisionHandler = (values:MultiValue<any>):void => {
        setSelectedDivisions([])
        values.map(
            (item:{value:string, label:string}):void => {
                setSelectedDivisions(prevState => [...prevState,item])
            }
        )
    }


    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const requestData:updateRequestData = {
            title: title,
            divisions: selectedDivisions?.map(item => item.value),
            startDate: startDate,
            endDate: endDate,
            updatePlaces: places,
            relatedURL: relatedURL,
            ckData:ckData,
            realCkImgs:[],
            uploadedAttachedFiles:attachedFileList.map((item) => item.filePath),
            deletedCkImgUrls: []
        }

        // 기존 ck이미지에서 삭제된 이미지 추출 -> 백엔드에서 삭제된 이미지는 DB데이터 삭제 및 버킷 파일 삭제 요청
        for (let i:number = 0; i < data.ckImgUrls.length; i++ ) {
            if (!ckData.includes(data.ckImgUrls[i])) {
                requestData.deletedCkImgUrls.push(data.ckImgUrls[i]);
            }
        }
        // 새로운 ck 이미지
        for (let i:number = 0; i < newCkImgUrls.length; i++) {
            if(ckData.includes(newCkImgUrls[i])) {
                requestData.realCkImgs.push(newCkImgUrls[i])
            }
        }
        confirmAndCancelAlertWithLoading("question", "대회를 수정하시겠습니까?", "", async () => {
            if (id) await FetchUpdateCompetition(id, requestData, files)
        })
    }


    useEffect(() => {
        setTitle(data?.title)
        setSelectedDivisions(data?.divisions.map((value:string):divisionType => {
            const label: string = DivisionOptions.filter((i) => i.value === value)[0].label;
            return {value, label}
        }))
        setStartDate(data?.startDate)
        setEndDate(data?.endDate)
        setPlaces(data?.places)
        setRelatedUrl(data?.relatedUrl)
        setCkData(data?.content)
    }, [data]);


    if (isLoading) {
        return <>Loading</>
    }


    return (
        <div className={style.AddCompetitionPage}>
            <PageTitle pageName="대회수정"/>
            <form className={style.container} onSubmit={(e: React.FormEvent<HTMLFormElement>) => formSubmitHandler(e)}>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"대회명"} height={"normal"}/>
                    <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                           value={title}
                           type={"text"}
                           className={style.titleInput}
                           placeholder="대회명을 입력해주세요"
                    />
                </div>
                <div className={style.inputArea}>
                    <AddCompetitionLabel label={"종별"} height={"normal"}/>
                    {selectedDivisions &&
                        <Select
                            components={makeAnimated()}
                            options={DivisionOptions}
                            isSearchable={false}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            placeholder={"선택"}
                            className={style.select}
                            onChange={(values: MultiValue<any>) => divisionHandler(values)}
                            value={selectedDivisions}
                        />
                    }

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
                           value={relatedURL === null ? "" : relatedURL}
                    />
                </div>
                <div className={style.inputArea2}>
                    <AddCompetitionLabel label={"첨부파일"} height={"double"}/>
                    <UpdateFiles attachedFiles={data?.competitionDetailAttachedFiles} files={files} setFiles={setFiles} attachedFileList={attachedFileList} setAttachedFileList={setAttachedFileList}/>
                </div>
                <div className={style.CkEditorTitle}>
                    <p>내용</p>
                </div>
                <div className={style.CkEditor}>
                    <CkEditor ckData={ckData} setCkData={setCkData} setNewCkImgUrls={setNewCkImgUrls}/>
                </div>
                <RegitUpdateDeleteButton content={"수정"}/>
            </form>
        </div>
    );
}
