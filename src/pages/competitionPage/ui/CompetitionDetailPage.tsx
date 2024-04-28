import React from 'react';
import {PageTitle} from "../../../shared/ui";
import style from "./CompetitionDetailPage.module.css"
import {CompetitionDetailInfo, CompetitionDetailTitle} from "../../../widgets/competition";
import {CompetitionDetailCategory} from "../../../features/competition";

export const CompetitionDetailPage = () => {


    return (
        <div className={style.CompetitionDetailPage}>
            <PageTitle pageName={"대회정보"} />
            <CompetitionDetailTitle  status={"예정"} title={"2023 제주특별자치도 도민체전"}/>
            <CompetitionDetailCategory />
            <CompetitionDetailInfo />
        </div>
    );
};
