import React from 'react';
import style from "./AddCompetitionLabel.module.css"

type Props = {
    label: string;
}
const AddCompetitionLabel = ({label}:Props) => {
    return (
        <div className={style.AddCompetitionLabel}>
            <label >
                {label}
            </label>
        </div>

    );
};

export default AddCompetitionLabel;