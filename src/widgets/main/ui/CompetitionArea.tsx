import React from 'react';

import style from "./CompetitionArea.module.css"
import {MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {CompetitionCarousel} from "./CompetitionCarousel";

export const CompetitionArea = () => {

    return (
        <div className={style.CompetitionArea}>
            <MainTitle title={"대회 정보"} color={"black"} />
            <div className={style.titleBar} ></div>
            <div className={style.navigateBtnArea}>
                <NavigateAllItemBtn path={"/competition"} color={"#D4C39C"} />
            </div>
            <CompetitionCarousel />
        </div>

    );
};
