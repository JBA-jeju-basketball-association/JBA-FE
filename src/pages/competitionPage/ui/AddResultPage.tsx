import React, {useState} from 'react';
import style from "./AddResultPage.module.css"
import {PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import {useParams} from "react-router-dom";
import {CompetitionDetailTitle, competitionStatusCalculator, FloorBox} from "../../../widgets/competition";
import {competitionResultList} from "../../../shared/type/CompetitionType";
import FetchAddResult from "../api/FetchAddResult";

export const AddResultPage = () => {
    const {id} = useParams();
    const {data:detailData} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => fetchCompetitionInfo(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
    })



    const initialResult:competitionResultList = {
        floor:"경기",
        competitionResult: [{
            division:"",
            startTime:new Date(),
            homeName: "",
            homeScore:0,
            awayName: "",
            awayScore:0,
            fileUrl:"",
            fileName: ""
        }]
    }
    const [resultList, setResultList] = useState<competitionResultList[]>([initialResult]);

    function submitHandler() {
        if (id != null) {
            FetchAddResult(resultList, id)
        }
    }

    return (
        <div className={style.AddResultPage}>
            <PageTitle pageName={"대회결과등록"} />
            <CompetitionDetailTitle  status={competitionStatusCalculator(detailData?.startDate, detailData?.endDate)} title={detailData?.title}/>
            <div className={style.container}>
                {detailData && resultList?.map((fl:competitionResultList, index:number)=> {
                    return <FloorBox index={index} resultList={resultList} key={index} setResultList={setResultList} divisions={detailData?.divisions}/>
                })}
            </div>
            <RegitUpdateDeleteButton onClickHandler={() => submitHandler()} content={"등록"} />
        </div>
    );
};
