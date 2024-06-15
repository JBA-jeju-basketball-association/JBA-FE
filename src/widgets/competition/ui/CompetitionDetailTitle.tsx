import React from 'react';
import style from "./CompetitionDetailTitle.module.css"


type Props = {
    status: string;
    title: string;
};
export const CompetitionDetailTitle = ({status, title}:Props) => {
    return (
        <div className={style.CompetitionDetailTitle}>
            <div>
                <p style={status==="예정"?{color:"red"}:status==="진행중"?{color:"blue"}:{color:"black"}}>{status}</p>
            </div>
            <h1>
                {title}
            </h1>
        </div>
    );
};
