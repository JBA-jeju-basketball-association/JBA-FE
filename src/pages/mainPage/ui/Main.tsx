import React from 'react';
import {AnnouncementArea, Banner, CompetitionArea, GalleryArea} from "../../../widgets/main";
import style from "./Main.module.css"


const Main = () => {


    return (
        <div className={style.Main}>
            <Banner />
            <AnnouncementArea />
            <CompetitionArea />
            <GalleryArea />

        </div>

    );
};

export default Main;