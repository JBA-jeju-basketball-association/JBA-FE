import React, {useState} from 'react';
import {AnnouncementArea, Banner, CompetitionArea, GalleryArea} from "../../../widgets/main";
import style from "./Main.module.css"


const Main = () => {
    const [usingCompetitionArea, setUsingCompetitionArea] = useState<boolean>(true);
    const [usingAnnouncementArea, setUsingAnnouncementArea] = useState<boolean>(true);
    const [usingGalleryArea, setUsingGalleryArea] = useState<boolean>(true);

    return (
        <div className={style.Main}>
            <Banner />
            {usingAnnouncementArea && <AnnouncementArea usingAnnouncementArea={usingAnnouncementArea} setUsingAnnouncementArea={setUsingAnnouncementArea}/>}
            {usingCompetitionArea && <CompetitionArea usingCompetitionArea={usingCompetitionArea} setUsingCompetitionArea={setUsingCompetitionArea}/>}
            {usingGalleryArea && <GalleryArea usingGalleryArea={usingGalleryArea} setUsingGalleryArea={setUsingGalleryArea}/>}
        </div>

    );
};

export default Main;