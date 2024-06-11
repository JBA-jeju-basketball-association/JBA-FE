import React from 'react';
import style from "./GalleryCardContent.module.css"

type Props = {
    title: string;
    date: string;
}
export const GalleryCardContent = ({title, date}:Props) => {
    return (
        <div className={style.GalleryCardContent}>
            <p>{title && title}</p>
            <p>{date && date}</p>
        </div>
    );
};
