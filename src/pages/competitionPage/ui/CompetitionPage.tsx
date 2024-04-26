import React, {useState} from 'react';
import style from "./CompetitionPage.module.css"
import {PageTitle} from "../../../shared/ui";
import {CompetitionStatusFilter} from "../../../features/competition";
import Select, {SingleValue} from "react-select";
import {CompetitionRow, CompetitionTitleArea} from "../../../widgets/competition";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {competitionListItem} from "../type/type";

export const CompetitionPage = () => {
    const [statusFocused, setStatusFocused] = useState<string>("ALL")
    const [year, setYear] = useState<string>("2024");
    const [page, setPage] = useState<number>(1);

    const options:{value:string, label:string}[] = [
        {value:"2024", label:"2024"},
        {value:"2023", label:"2023"},
        {value:"2022", label:"2022"},
        {value:"2021", label:"2021"},
        {value:"2020", label:"2020"},
        {value:"2019", label:"2019"},
        {value:"2018", label:"2018"},
        {value:"2017", label:"2017"},
        {value:"2016", label:"2016"}
    ]

    const fetchGetCompetitionList = async () => {
        return axios.get(`http://localhost:8080/v1/api/competition/competition?status=${statusFocused}&year=${year}&page=${page-1}&size=10`)
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["getCompetitionList", year, statusFocused, page],
        queryFn:fetchGetCompetitionList,
        select:(result) => result.data.data,
        retry:1,
        gcTime:60000,
        staleTime:60000,
        refetchOnMount:true,
    });

    console.log(data)



    return (
        <div className={style.CompetitionPage}>
            <PageTitle pageName="대회정보"/>
            <div className={style.container}>
                <div className={style.statusArea}>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="전체" id={"ALL"}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="예정" id={"EXPECTED"}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="진행중" id={"PROCEEDING"}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="완료" id={"COMPLETE"}/>
                </div>
                <div>
                    <Select
                        options={options}
                        className={style.yearFilter}
                        placeholder={"선택"}
                        required={true}
                        defaultValue={options[0]}
                        onChange={(newValue:SingleValue<any>) => setYear(newValue.value)}
                    />
                </div>
                <div>
                    <CompetitionTitleArea />
                </div>
                <div>
                    {data?.content.map((item:competitionListItem,index:number) => {
                        return <CompetitionRow key={item.competitionId} item={item} index={index} totalElements={data.totalElements} pageNumber={data.pageable.pageNumber}/>
                    })}
                </div>
            </div>
        </div>
    );
};
