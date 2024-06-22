import React, {useState} from 'react';
import {ListLinkBtn, LoadingSpinner, PageTitle, RegitUpdateDeleteButton} from "../../../shared/ui";
import style from "./CompetitionDetailPage.module.css"
import {CompetitionDetailInfo, CompetitionDetailTitle, competitionStatusCalculator,CompetitionResult} from "../../../widgets/competition";
import {CompetitionDetailCategory} from "../../../features/competition";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import fetchCompetitionInfo from "../../../widgets/competition/api/FetchCompetitionInfo";
import {JwtDecoder} from "../../../shared/lib";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";
import fetchDeleteCompetition from "../../../widgets/competition/api/FetchDeleteCompetition";
import {useUserStore} from "../../../shared/model";

export const CompetitionDetailPage = () => {
    const [infoFocused, setInfoFocused] = useState<boolean>(true);
    const navigate = useNavigate();
    const {AccessToken} = useUserStore();
    const {id} = useParams();
    const {data, isLoading, isError, error} = useQuery({
        queryKey:["getCompetitionDetail", id],
        queryFn:() => fetchCompetitionInfo(id),
        select:(result) => result?.data.data,
        gcTime:1000*60*10,
    })

    function updateHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회정보를 수정하겠습니까?", "대회수정 페이지로 이동합니다.")
            .then((res) => {
                if (res.isConfirmed) {
                    navigate(`/competition/update-competition/${id}`)
                }
            });
    }

    function deleteHandler() {
        confirmAndCancelAlertWithLoading("warning", "대회를 삭제하겠습니까?", "삭제된 대회는 복구할 수 없습니다.",  async () =>{
            id && await fetchDeleteCompetition(id)
        })
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    return (
        <div className={style.CompetitionDetailPage}>
            <PageTitle pageName={"대회정보"} />
            <div className={style.listLinkArea}>
                <ListLinkBtn content={"목록"} linkFC={() => navigate("/competition")} />
                {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ?
                    <div className={style.updateDeleteButtonArea}>
                        <RegitUpdateDeleteButton onClickHandler={() => updateHandler()} content={"수정"} />
                        <RegitUpdateDeleteButton onClickHandler={() => deleteHandler()} content={"삭제"} />
                    </div>
                    :
                    null
                }
            </div>
            <CompetitionDetailTitle  status={competitionStatusCalculator(data?.startDate, data?.endDate)} title={data?.title}/>
            <CompetitionDetailCategory existResult={data?.existResult} infoFocused={infoFocused} setInfoFocused={setInfoFocused}/>
            {infoFocused?<CompetitionDetailInfo data={data && data}/>:<CompetitionResult/>}
        </div>
    );
};
