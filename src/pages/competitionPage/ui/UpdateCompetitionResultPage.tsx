import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {competitionResultList} from "../../../shared/type/CompetitionType";
import style from "./UpdateCompetitionResultPage.module.css";
import {PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {
    CompetitionDetailTitle,
    competitionStatusCalculator,
    UpdateFloorBox
} from "../../../widgets/competition";
import fetchGetCompetitionResultWithTitle from "../api/FetchGetCompetitionResultWithTitle";
import FetchUpdateResult from "../api/FetchUpdateResult";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";

export const UpdateCompetitionResultPage = () => {
    const {id} = useParams();
    const {data:resultData} = useQuery({
        queryKey: ["getCompetitionResultWithTitle", id],
        queryFn: () => fetchGetCompetitionResultWithTitle(id),
        select: (result) => result?.data.data,
        refetchOnWindowFocus:false,
        refetchOnMount: false,
        gcTime:1000*60*10,
    })

    const [resultList, setResultList] = useState<competitionResultList[]>([]);

    function submitHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회결과를 수정하시겠습니까?","", async()=>{
            id && await FetchUpdateResult(resultList, id)
        })

    }


    useEffect(() => {
        if (resultData?.resultResponse.length === 0) {
            window.location.href = `competition/${id}`
        }else {
            resultData?.resultResponse.forEach((result:competitionResultList) =>  {
                setResultList(prevState => [...prevState,result])
            })
        }
    }, [resultData]);
    return (
        <div className={style.AddResultPage}>
            <PageTitle pageName={"대회결과수정"}/>
            <CompetitionDetailTitle status={competitionStatusCalculator(resultData?.startDate, resultData?.endDate)}
                                    title={resultData?.title}/>
            <div className={style.container}>
                {resultData?.resultResponse && resultList.map((fl:  competitionResultList, index: number) => {
                    return <UpdateFloorBox index={index} resultList={resultList} key={index} setResultList={setResultList}
                                     divisions={resultData?.divisionList}/>
                })}
            </div>
            <RegitUpdateDeleteButton onClickHandler={submitHandler} content={"수정"} />
        </div>
    );
};
