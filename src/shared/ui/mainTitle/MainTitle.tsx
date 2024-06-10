import React from 'react';
import style from "./MainTitle.module.css"

type Props = {
    title: string;
    color: string;
}

export const MainTitle = ({title,color}:Props) => {
    return (
        <p className={style.title} style={{color: color}}>
            {title}
        </p>
    );
};
