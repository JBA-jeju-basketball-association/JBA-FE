import React from 'react';
import {AnnouncementArea, Banner, CompetitionArea} from "../../../widgets/main";
import style from "./Main.module.css"


const Main = () => {


    return (
        <div className={style.Main}>
            <Banner />
            <AnnouncementArea />
            <CompetitionArea />


        </div>

    );
};

export default Main;