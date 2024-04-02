import React from 'react';
import style from "./AddCompetitionLabel.module.css"

type Props = {
    label: string;
    height: string;
}
const AddCompetitionLabel = ({label, height}:Props) => {

    return (
        <label className={height === "normal" ? style.AddCompetitionLabel : style.AddCompetitionLabelDouble}>
                {label}
        </label>

    );
};

export default AddCompetitionLabel;