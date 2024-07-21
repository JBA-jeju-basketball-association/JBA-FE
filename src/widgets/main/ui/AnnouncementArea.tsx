import React, {Dispatch} from 'react';
import style from "./Announcement.module.css"
import {MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {AnnouncementCarousel} from "./AnnouncementCarousel";

type Props = {
    usingAnnouncementArea: boolean;
    setUsingAnnouncementArea:  React.Dispatch<React.SetStateAction<boolean>>;
}
export const AnnouncementArea = ({usingAnnouncementArea, setUsingAnnouncementArea}:Props) => {
    return (
        <div className={style.AnnouncementArea}>
            <div className={style.overlay}>
                <MainTitle title={"협회공지"} color={"#FFFFFF"}/>
                <div className={style.titleBar}></div>
                <div className={style.navigateBtnArea}>
                    <NavigateAllItemBtn path={"/post/notice"} color={"#BA5422"}/>
                </div>
                <AnnouncementCarousel usingAnnouncementArea={usingAnnouncementArea} setUsingAnnouncementArea={setUsingAnnouncementArea}/>
            </div>
        </div>
    );
};
