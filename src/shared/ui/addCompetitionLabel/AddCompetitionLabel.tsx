import React from 'react';
import style from "./AddCompetitionLabel.module.css"

type Props = {
    label: string;
    height: string;
}
export const AddCompetitionLabel = ({label, height}:Props) => {

    return (
        <label className={height === "normal" ? style.AddCompetitionLabel : style.AddCompetitionLabelDouble}>
                {label}
        </label>

    );
};
