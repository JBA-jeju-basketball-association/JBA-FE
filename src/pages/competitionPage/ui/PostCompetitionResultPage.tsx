import React, {useEffect, useState} from 'react';
import style from "./PostCompetitionResultPage.module.css"
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import FetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import FetchGetSchedule from "../../../widgets/competition/api/FetchGetSchedule";
import {
    getScheduleResponse,
    postCompetitionResult, postResultRequestRows
} from "../../../shared/type/CompetitionType";
import {PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {CompetitionDetailTitle, competitionStatusCalculator, PostScheduleBox} from "../../../widgets/competition";
import {PostResultBox} from "../../../widgets/competition/ui/PostResultBox";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";
import FetchPostResult from "../api/FetchPostResult";

export const PostCompetitionResultPage = () => {
    const [postCompetitionResult, setPostCompetitionResult] = useState<postCompetitionResult[]>([]);

    const {id} = useParams();
    const {data:detailData} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => FetchCompetitionInfo(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    })

    const {data:scheduleData} = useQuery({
        queryKey:["getSchedule", id],
        queryFn:() => FetchGetSchedule(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
        refetchOnMount: false,
        refetchInterval: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        refetchIntervalInBackground: false,
    })

    const postResultHandler = () => {
        confirmAndCancelAlertWithLoading("question", "대회결과 등록", "대회결과를 등록하시겠습니까?", async () =>{
            id && FetchPostResult(id, postCompetitionResult)
        })
    }

    useEffect(() => {
        if (scheduleData) {
            scheduleData?.map((s:getScheduleResponse, index:number):void => {
                const list:postResultRequestRows[] = s?.getScheduleRows?.map((row) => {
                    return {
                        competitionResultId: row.competitionResultId,
                        gameNumber: row.gameNumber,
                        startDate: row.startDate,
                        floor: row.floor,
                        place: row.place,
                        homeName: row.homeName,
                        homeScore: null,
                        awayName: row.awayName,
                        awayScore: null,
                        filePath: null,
                        fileName: "",
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
    }, [scheduleData]);
    console.log(postCompetitionResult)
    
    return (
        <div className={style.PostCompetitionResultPage}>
            <PageTitle pageName={"대회결과등록"}/>
            <CompetitionDetailTitle status={competitionStatusCalculator(detailData?.startDate, detailData?.endDate)} title={detailData?.title}/>
            {detailData?.divisions?.map((division:string, index:number) => {
                return <PostResultBox key={index}
                                      postCompetitionResult={postCompetitionResult}
                                      setPostCompetitionResult={setPostCompetitionResult}
                                      index={index}
                                      places={detailData.places}
                />
            })}
            <RegitUpdateDeleteButton content={"등록"} onClickHandler={() => postResultHandler()}/>
        </div>
    );
};
