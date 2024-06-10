import React from 'react';
import style from "./Announcement.module.css"
import {MainTitle, NavigateAllItemBtn} from "../../../shared/ui";
import {AnnouncementCarousel} from "./AnnouncementCarousel";

export const AnnouncementArea = () => {
    return (
        <div className={style.AnnouncementArea}>
            <div className={style.overlay}>
                <MainTitle title={"협회공지"} color={"#FFFFFF"}/>
                <div className={style.titleBar}></div>
                <div className={style.navigateBtnArea}>
                    <NavigateAllItemBtn path={"/post/notice"} color={"#BA5422"}/>
                </div>
                <AnnouncementCarousel />
            </div>
        </div>
    );
};
