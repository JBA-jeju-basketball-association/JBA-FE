import React from 'react';
import style from "./ListErrorRow.module.css"

type Props = {
    content:string;
}

export const ListErrorRow = ({content}:Props) => {
    return (
        <div className={style.ListErrorRow}>
            <p>{content}</p>
        </div>
    );
};
