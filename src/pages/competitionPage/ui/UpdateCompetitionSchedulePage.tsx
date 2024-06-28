import React, {useEffect, useState} from 'react';
import style from "./UpdateCompetitionSchedulePage.module.css"
import {PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import {CompetitionDetailTitle, competitionStatusCalculator, PostScheduleBox} from "../../../widgets/competition";
import {
    getScheduleResponse, getScheduleResponseRow,
    postCompetitionSchedule,
    postCompetitionScheduleRow
} from "../../../shared/type/CompetitionType";
import FetchPostSchedule from "../api/FetchPostSchedule";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";
import FetchGetSchedule from "../../../widgets/competition/api/FetchGetSchedule";
import FetchUpdateSchedule from "../api/FetchUpdateSchedule";

export const UpdateCompetitionSchedulePage = () => {
    const [updateCompetitionScheduleList, setUpdateCompetitionScheduleList] = useState<postCompetitionSchedule[]>([]);

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

    const updateHandler = () => {
        confirmAndCancelAlertWithLoading("question", "대회일정 수정", "대회일정을 수정하시겠습니까?", async () =>{
            id && FetchUpdateSchedule(id, updateCompetitionScheduleList)
        })
    }

    useEffect(() => {
        if (scheduleData) {
            scheduleData?.map((s:getScheduleResponse, index:number):void => {


                const list:postCompetitionScheduleRow[] = s?.getScheduleRows?.map((row) => {
                     return {
                         gameNumber: row.gameNumber,
                         startDate: row.startDate,
                         floor: row.floor,
                         place: row.place,
                         homeName: row.homeName,
                         awayName: row.awayName,
                         state5x5: row.state5x5
                     }
                })
                const initialData:postCompetitionSchedule = {
                    division: s.division,
                    postCompetitionScheduleRow: list
                }

                setUpdateCompetitionScheduleList(prevState => [...prevState, initialData])
            })
        }
    }, [scheduleData]);

    return (
        <div className={style.UpdateCompetitionSchedulePage}>
            <PageTitle pageName={"대회일정등록"}/>
            <CompetitionDetailTitle status={competitionStatusCalculator(detailData?.startDate, detailData?.endDate)} title={detailData?.title}/>
            {detailData?.divisions?.map((division:string, index:number) => {
                return <PostScheduleBox key={index}
                                        postCompetitionScheduleList={updateCompetitionScheduleList}
                                        setPostCompetitionScheduleList={setUpdateCompetitionScheduleList}
                                        index={index}
                                        places={detailData.places}
                />
            })}
            <RegitUpdateDeleteButton content={"수정"} onClickHandler={() => updateHandler()}/>
        </div>
    );
};
