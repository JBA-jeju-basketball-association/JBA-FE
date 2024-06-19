import React from 'react';
import style from "./AddCompetitionLabel.module.css"

type Props = {
    label: string;
}
export const AddCompetitionLabel = ({label}:Props) => {

    return (
            <div className={style.AddCompetitionLabel}>
                {label}
            </div>
    );
};
