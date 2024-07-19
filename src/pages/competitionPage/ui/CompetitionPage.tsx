import React, {useState} from 'react';
import style from "./CompetitionPage.module.css"
import {LoadingSpinner, PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import {CompetitionStatusFilter} from "../../../features/competition";
import Select, {SingleValue} from "react-select";
import {CompetitionRow, CompetitionTitleArea} from "../../../widgets/competition";
import {useQuery, keepPreviousData} from "@tanstack/react-query";
import {competitionListItem} from "../../../shared/type/CompetitionType";
import {Pagination} from "../../../widgets/pagination";
import fetchGetCompetitionList from "../api/FetchGetCompetitionList";
import fetchCompetitionYearList from "../api/FetchCompetitionYearList";
import {useNavigate} from "react-router-dom";
import {thisYear, useUserStore} from "../../../shared/model";
import {JwtDecoder} from "../../../shared/lib";
import {ListErrorRow} from "../../../shared/ui/listErrorRow/ListErrorRow";

export const CompetitionPage = () => {
    const [statusFocused, setStatusFocused] = useState<string>("ALL")
    const [year, setYear] = useState<string>(thisYear.toString());
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    const {AccessToken} = useUserStore();

    const pageSize:number = 10;

    const {data:yearData} = useQuery({
        queryKey:["getCompetitionYearList"],
        queryFn:()=> fetchCompetitionYearList(),
        select: (result:any) => result.data.data,
        retry:1,
        gcTime:1000 * 60 * 60,
        staleTime:1000 * 60 * 10
    })

    const {data, isLoading, isError, error} = useQuery({
        queryKey:["getCompetitionList", year, statusFocused, page],
        queryFn:()=> fetchGetCompetitionList(statusFocused, year, page, pageSize),
        select:(result:any) => result.data.data,
        retry:0,
        gcTime:60 * 1000,
        refetchOnMount:true,
        placeholderData: keepPreviousData,
    });

    const options: { value: string, label: string; }[] = [];
    if (yearData) {
        for (let i:number = 0; i < yearData.length; i++ ) {
            if (yearData[i].toString() !== year) {
                options.push({
                    value:yearData[i].toString(),
                    label:yearData[i].toString()
                })
            }
        }
    }

    if (isLoading) {
        return <LoadingSpinner />
    }
    return (
        <div className={style.CompetitionPage}>
            <PageTitle pageName="대회정보"/>
            <div className={style.containerBox}>
                <div className={style.selectAndRegisterArea}>
                    <Select
                        options={options}
                        className={style.yearFilter}
                        value={{value:year, label:year}}
                        required={true}
                        onChange={(newValue: SingleValue<any>) => setYear(newValue.value)}
                    />
                    {AccessToken && (JwtDecoder(AccessToken).role === "ROLE_MASTER") ?
                        <RegitUpdateDeleteButton onClickHandler={() => navigate("/competition/post")}
                                                 content={"대회등록"}/> : ""}
                </div>
                <div className={style.statusArea}>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="전체"
                                             id={"ALL"} setPage={setPage}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="예정"
                                             id={"EXPECTED"} setPage={setPage}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused}
                                             name="진행중" id={"PROCEEDING"} setPage={setPage}/>
                    <CompetitionStatusFilter statusFocused={statusFocused} setStatusFocused={setStatusFocused} name="완료"
                                             id={"COMPLETE"} setPage={setPage} end={"ok"}/>
                </div>
                <div>
                    <CompetitionTitleArea/>
                </div>
                <div>
                    {data?.content.map((item: competitionListItem, index: number) => {
                        return <CompetitionRow key={item.competitionId} item={item} index={index}
                                               totalElements={data.totalElements}
                                               pageNumber={data.pageable.pageNumber}/>
                    })}
                    {error?.message === "Request failed with status code 404" ?
                        <ListErrorRow content={"대회가 없습니다."}/> : ""}
                </div>
                <Pagination totalPages={Math.max(1, data?.totalPages)} page={page} setPage={setPage}/>
            </div>
        </div>
    );
};
