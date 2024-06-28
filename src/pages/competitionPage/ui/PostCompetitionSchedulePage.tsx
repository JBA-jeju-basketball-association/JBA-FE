import React, {useEffect, useState} from 'react';
import style from "./PostCompetitionSchedulePage.module.css"
import {PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import {CompetitionDetailTitle, competitionStatusCalculator, PostScheduleBox} from "../../../widgets/competition";
import {postCompetitionSchedule, postCompetitionScheduleRow} from "../../../shared/type/CompetitionType";
import FetchPostSchedule from "../api/FetchPostSchedule";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";

export const PostCompetitionSchedulePage = () => {
    const [postCompetitionScheduleList, setPostCompetitionScheduleList] = useState<postCompetitionSchedule[]>([]);

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

    const submitHandler = () => {
        confirmAndCancelAlertWithLoading("question", "대회일정 등록", "대회일정을 등록하시겠습니까?", async () =>{
            id && FetchPostSchedule(id, postCompetitionScheduleList)
        })
    }

    useEffect(() => {
        if (detailData) {
            detailData.divisions.map((d:string, index:number):void => {
                const initialRow:postCompetitionScheduleRow = {
                    gameNumber: index + 1,
                    startDate: new Date(new Date().getTime() + (3600000 * index)) ,
                    floor: "",
                    place: detailData.places[0].placeName,
                    homeName: "",
                    awayName: "",
                    state5x5: true
                }
                const initialData:postCompetitionSchedule = {
                    division: d,
                    postCompetitionScheduleRow: [initialRow]
                }
                setPostCompetitionScheduleList(prevState => [...prevState, initialData])
            })
        }
    }, [detailData]);

    return (
        <div className={style.PostCompetitionSchedulePage}>
            <PageTitle pageName={"대회일정등록"}/>
            <CompetitionDetailTitle status={competitionStatusCalculator(detailData?.startDate, detailData?.endDate)} title={detailData?.title}/>
            {detailData?.divisions.map((division:string, index:number) => {
                return <PostScheduleBox key={index}
                                        postCompetitionScheduleList={postCompetitionScheduleList}
                                        setPostCompetitionScheduleList={setPostCompetitionScheduleList}
                                        index={index}
                                        places={detailData.places}
                />
            })}
            <RegitUpdateDeleteButton content={"등록"} onClickHandler={() => submitHandler()}/>
        </div>
    );
};
