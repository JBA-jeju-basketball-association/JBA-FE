import React from 'react';
import style from "../../../widgets/competition/ui/CompetitionDetailInfo.module.css";
import {CompetitionDetailLabel} from "../../../shared/ui";

type Props = {
    data: string | undefined;
    label: string;
    type: string;
}

export const CompetitionDetailInfoRow = ({data, type, label}:Props) => {
    return (
        <div className={type==="half"? style.halfInfoArea: style.infoArea}>
            <CompetitionDetailLabel name={label}/>
            <div className={style.info}><p>{data}</p></div>
        </div>
    );
};
