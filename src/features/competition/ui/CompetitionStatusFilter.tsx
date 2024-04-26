import React from 'react';
import style from "./CompetitionStatusFilter.module.css"
type Props = {
    statusFocused:string;
    setStatusFocused: React.Dispatch<React.SetStateAction<string>>;
    name:string;
    id:string;
}

export const CompetitionStatusFilter = ({statusFocused, setStatusFocused, name, id}:Props) => {
    return (
        <button
            className={statusFocused === id? style.statusButtonFocused : style.statusButton}
            onClick={() => setStatusFocused(id)}
        >{name}</button>
    );
};
