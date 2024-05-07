import React, {useState} from 'react';
import {PageTitle} from "../../../shared/ui";
import style from "./CompetitionDetailPage.module.css"
import {CompetitionDetailInfo, CompetitionDetailTitle, competitionStatusCalculator,CompetitionResult} from "../../../widgets/competition";
import {CompetitionDetailCategory} from "../../../features/competition";
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";

export const CompetitionDetailPage = () => {
    const [infoFocused, setInfoFocused] = useState<boolean>(true);



    const {id} = useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => fetchCompetitionInfo(id),
        select:(result) => result.data.data,
        gcTime:1000*60*10,
        staleTime:1000*60
    })

    console.log(data)

    if (isLoading) {
        return <div>Loading.....</div>
    }

    return (
        <div className={style.CompetitionDetailPage}>
            <PageTitle pageName={"대회정보"} />
            <CompetitionDetailTitle  status={competitionStatusCalculator(data?.startDate, data?.endDate)} title={data?.title}/>
            <CompetitionDetailCategory existResult={data.existResult} infoFocused={infoFocused} setInfoFocused={setInfoFocused}/>
            {infoFocused?<CompetitionDetailInfo data={data}/>:<CompetitionResult/>}
        </div>
    );
};
