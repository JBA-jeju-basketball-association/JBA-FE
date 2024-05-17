import React, {useState} from 'react';
import Select, {SingleValue} from "react-select";
import style from "./CompetitionResult.module.css";
import {useQuery} from "@tanstack/react-query";
import {useNavigate, useParams} from "react-router-dom";
import fetchGetCompetitionResult from "../api/FetchGetCompetitionResult";
import {ResultList} from "./ResultList";
import {getResultBox} from "../../../shared/type/CompetitionType";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";
import {JwtDecoder} from "../../../shared/lib";
import {useUserStore} from "../../../shared/model";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";

export const CompetitionResult = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [divisionSelect, setDivisionSelect] = useState<string>("all");
    const {AccessToken} = useUserStore();


    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["getCompetitionResult", id],
        queryFn: () => fetchGetCompetitionResult(id),
        select: (result) => result?.data.data,
        gcTime:1000*60*10,
        staleTime:1000*60
    })

    const divisionOptions:{value:string, label:string}[] = [{value:"all", label:"전체"}];
    data?.divisionList.forEach((item:string) => divisionOptions.push({value:item, label:DivisionOptions.filter(d=> d.value === item)[0].label}))

    function updateHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회결과를 수정하겠습니까?", "대회결과 수정페이지로 이동합니다.")
            .then((res) => {
                if (res.isConfirmed) {
                    navigate(`/competition/update-result/${id}`)
                }
            });
    }



    return (
        <div className={style.CompetitionResult}>
            <div className={style.selectAndUpdateDeleteArea}>
                <Select
                    options={divisionOptions.filter(item => item.value !== divisionSelect)}
                    className={style.divisionFilter}
                    placeholder={"전체"}
                    required={true}
                    onChange={(newValue: SingleValue<any>) => setDivisionSelect(newValue.value)}
                />
                {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ?
                    <button className={style.updateButton} onClick={() => updateHandler()}>수정</button>
                    :
                    null
                }
            </div>
            <div>
                {data?.resultResponse.map((r: getResultBox, index: number) => {
                    return <ResultList resultList={r} key={index} divisionSelect={divisionSelect}/>;
                })}
            </div>
        </div>
    );
};
