import React from 'react';
import style from "./GetCompetitionResult.module.css"
import {useQuery} from "@tanstack/react-query";
import {LoadingSpinner, RegitUpdateDeleteButton} from "../../../shared/ui";
import {getCompetitionResult} from "../../../shared/type/CompetitionType";
import FetchGetCompetitionResult from "../api/FetchGetCompetitionResult";
import {ResultDivisionBox} from "./ResultDivisionBox";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import FetchDeleteSchedule from "../api/FetchDeleteSchedule";
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";

type Props = {
    id: string | undefined;
}
export const GetCompetitionResult = ({id}:Props) => {

    const {data, isLoading} = useQuery({
        queryKey:["getCompetitionResult", id],
        queryFn: () => FetchGetCompetitionResult(id),
        select: (result) => result?.data.data
    })

    if (isLoading) {
        return <LoadingSpinner />
    }

    const updateHandler = () => {
        confirmAndCancelAlertWithLoading("question", "수정", "대회결과 수정페이지로 이동하시겠습니까?")
            .then(res => {
                if(res.isConfirmed && id) window.location.href = `/competition/update/result/${id}`
            })
    }

    const deleteHandler = () => {
        confirmAndCancelAlertWithLoading("warning", "삭제", "대회결과을 삭제하시겠습니까? 대회일정까지 삭제되고 대회정보는 보존됩니다.", async () =>{
            id && await FetchDeleteSchedule(id)
        }).then(res => {
            if (res.isConfirmed) {
                confirmAlert("success", "완료", "대회결과가 삭제되었습니다.")
                    .then(res => {
                        if (res.isConfirmed) window.location.href = `/competition/${id}`
                    })
            }
        });
    }


    return (
        <div className={style.Schedule}>
            {data?.map((data: getCompetitionResult, index: number) => {
                return <ResultDivisionBox key={index} data={data}/>
            })}
            <div className={style.updateDeleteBtnArea}>
                <RegitUpdateDeleteButton content={"결과수정"} onClickHandler={updateHandler}/>
                <RegitUpdateDeleteButton content={"결과삭제"} onClickHandler={deleteHandler}/>
            </div>
        </div>
    );
};
