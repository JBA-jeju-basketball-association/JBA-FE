import React from 'react';
import style from "./CompetitionDetailLabel.module.css"

type Props = {
    name: string;
}
export const CompetitionDetailLabel = ({name}:Props) => {
    return (
        <div className={style.CompetitionDetailLabel}>
            <p>{name}</p>
        </div>
    );
};
