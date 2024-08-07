import React from 'react';
import style from "./Schedule.module.css"
import {useQuery} from "@tanstack/react-query";
import FetchGetSchedule from "../api/FetchGetSchedule";
import {ScheduleDivisionBox} from "./ScheduleDivisionBox";
import {getScheduleResponse, place} from "../../../shared/type/CompetitionType";
import {LoadingSpinner, RegitUpdateDeleteButton} from "../../../shared/ui";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import FetchDeleteSchedule from "../api/FetchDeleteSchedule";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";


type Props = {
    id: string | undefined;
    places: place[]
}
export const Schedule = ({id, places}:Props) => {

    const {data, isLoading} = useQuery({
        queryKey:["getSchedule", id],
        queryFn: () => FetchGetSchedule(id),
        select: (result) => result?.data.data
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    const postResultHandler = () => {
        confirmAndCancelAlertWithLoading("question", "결과등록", "대회결과 등록페이지로 이동하시겠습니까?")
            .then(res => {
                if(res.isConfirmed && id) window.location.href = `/competition/post/result/${id}`
            })
    }

    const updateHandler = () => {
        confirmAndCancelAlertWithLoading("question", "수정", "대회일정 수정페이지로 이동하시겠습니까?")
            .then(res => {
                if(res.isConfirmed && id) window.location.href = `/competition/update/schedule/${id}`
            })
    }

    const deleteHandler = () => {
        confirmAndCancelAlertWithLoading("warning", "삭제", "대회일정을 삭제하시겠습니까? 대회정보는 보존됩니다.", async () =>{
            id && await FetchDeleteSchedule(id)
        }).then(res => {
                if (res.isConfirmed) {
                    confirmAlert("success", "완료", "대회일정이 삭제되었습니다.")
                        .then(res => {
                            if (res.isConfirmed) window.location.href = `/competition/${id}`
                        })
                }
            });
    }


    return (
        <div className={style.Schedule}>
            {places.length > 1 && <p className={style.infoContent}>* 체육관이 여러개인 관계로 상위 경기일정은 체육관별 경기번호 확인바랍니다.</p>}
            {data?.map((data: getScheduleResponse, index: number) => {
                return <ScheduleDivisionBox key={index} data={data}/>
            })}
            <div className={style.updateDeleteBtnArea}>
                <RegitUpdateDeleteButton content={"결과등록"} onClickHandler={postResultHandler}/>
                <RegitUpdateDeleteButton content={"일정수정"} onClickHandler={updateHandler}/>
                <RegitUpdateDeleteButton content={"일정삭제"} onClickHandler={deleteHandler}/>
            </div>
        </div>
    );
};
