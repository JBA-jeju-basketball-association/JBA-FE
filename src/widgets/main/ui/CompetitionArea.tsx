import React from 'react';

import style from "./CompetitionArea.module.css"
import {MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {CompetitionCarousel} from "./CompetitionCarousel";
import {useQuery} from "@tanstack/react-query";
import FetchMainCompetitionList from "../api/FetchMainCompetitionList";

type Props = {
    usingCompetitionArea: boolean;
    setUsingCompetitionArea:  React.Dispatch<React.SetStateAction<boolean>>;
}
export const CompetitionArea = ({usingCompetitionArea, setUsingCompetitionArea}:Props) => {


    return (
        <div className={style.CompetitionArea}>
            <MainTitle title={"대회 정보"} color={"black"} />
            <div className={style.titleBar} ></div>
            <div className={style.navigateBtnArea}>
                <NavigateAllItemBtn path={"/competition"} color={"#D4C39C"} />
            </div>
            <CompetitionCarousel usingCompetitionArea={usingCompetitionArea} setUsingCompetitionArea={setUsingCompetitionArea}/>
        </div>

    );
};
