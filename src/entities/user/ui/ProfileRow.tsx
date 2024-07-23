import React from 'react';
import style from "./ProfileRow.module.css"


type Props = {
    name: string;
    content: string;
}
export const ProfileRow = ({name, content}:Props) => {
    return (
        <div className={style.ProfileRow}>
            <div className={style.nameArea}>
                <p>{name}</p>
            </div>
            <p>{content }</p>
        </div>
    );
};
