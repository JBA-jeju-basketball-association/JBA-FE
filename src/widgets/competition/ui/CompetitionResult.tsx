import React, {useState} from 'react';
import Select, {SingleValue} from "react-select";
import style from "./CompetitionResult.module.css";
import {useQuery} from "@tanstack/react-query";
import {useParams} from "react-router-dom";
import fetchGetCompetitionResult from "../api/FetchGetCompetitionResult";
import {ResultList} from "./ResultList";
import {competitionResult, getResultBox} from "../../../shared/type/CompetitionResultType";
import {DivisionOptions} from "../../../shared/model/DivisionOptions";

export const CompetitionResult = () => {
    const {id} = useParams()
    const [divisionSelect, setDivisionSelect] = useState<string>("all");


    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["getCompetitionResult", id],
        queryFn: () => fetchGetCompetitionResult(id),
        select: (result) => result?.data.data
    })

    const divisionOptions:{value:string, label:string}[] = [{value:"all", label:"전체"}];
    data?.divisionList.forEach((item:string) => divisionOptions.push({value:item, label:DivisionOptions.filter(d=> d.value === item)[0].label}))

    return (
        <div className={style.CompetitionResult}>
            <div>
                <Select
                    options={divisionOptions.filter(item => item.value !== divisionSelect)}
                    className={style.divisionFilter}
                    placeholder={"전체"}
                    required={true}
                    onChange={(newValue:SingleValue<any>) => setDivisionSelect(newValue.value)}
                />
            </div>
            <div>
                {data?.resultResponse.map((r:getResultBox, index:number) => {
                        return <ResultList resultList={r} key={index} divisionSelect={divisionSelect}/>;
                })}
            </div>
        </div>
    );
};
