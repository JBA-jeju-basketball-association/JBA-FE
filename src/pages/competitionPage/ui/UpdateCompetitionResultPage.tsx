import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {
    competitionResultList,
    getCompetitionResult, getCompetitionResultRow,
    getScheduleResponse, postCompetitionResult,
    postResultRequestRows
} from "../../../shared/type/CompetitionType";
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
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import FetchGetSchedule from "../../../widgets/competition/api/FetchGetSchedule";
import FetchPostResult from "../api/FetchPostResult";
import FetchGetCompetitionResult from "../../../widgets/competition/api/FetchGetCompetitionResult";
import {PostResultBox} from "../../../widgets/competition/ui/PostResultBox";

export const UpdateCompetitionResultPage = () => {
    const [postCompetitionResult, setPostCompetitionResult] = useState<postCompetitionResult[]>([]);

    const {id} = useParams();
    const {data:detailData} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => fetchCompetitionInfo(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    })

    const {data, isLoading} = useQuery({
        queryKey:["getCompetitionResult", id],
        queryFn: () => FetchGetCompetitionResult(id),
        select: (result) => result?.data.data
    })
    console.log(data)

    const postResultHandler = () => {
        confirmAndCancelAlertWithLoading("question", "대회결과 수정", "대회결과를 수정하시겠습니까?", async () =>{
            id && FetchPostResult(id, postCompetitionResult)
        })
    }

    useEffect(() => {
        if (data) {
            console.log(data, "dd")
            data?.map((s:getCompetitionResult, index:number):void => {
                const list:postResultRequestRows[] = s?.getResultResponseRows?.map((row) => {
                    return {
                        competitionResultId: row.competitionResultId,
                        gameNumber: row.gameNumber,
                        startDate: row.startDate,
                        floor: row.floor,
                        place: row.place,
                        homeName: row.homeName,
                        homeScore: row.homeScore,
                        awayName: row.awayName,
                        awayScore: row.awayScore,
                        filePath: row.filePath,
                        fileName: row.fileName,
                        state5x5: row.state5x5
                    }
                })
                const initialData:postCompetitionResult = {
                    division: s.division,
                    postResultRequestRows: list
                }

                setPostCompetitionResult(prevState => [...prevState, initialData])
            })
        }
    }, [data]);
    return (
        <div className={style.PostCompetitionResultPage}>
            <PageTitle pageName={"대회결과수정"}/>
            <CompetitionDetailTitle status={competitionStatusCalculator(detailData?.startDate, detailData?.endDate)} title={detailData?.title}/>
            {detailData?.divisions?.map((division:string, index:number) => {
                return <PostResultBox key={index}
                                      postCompetitionResult={postCompetitionResult}
                                      setPostCompetitionResult={setPostCompetitionResult}
                                      index={index}
                                      places={detailData.places}
                />
            })}
            <RegitUpdateDeleteButton content={"수정"} onClickHandler={() => postResultHandler()}/>
        </div>
    );
};
