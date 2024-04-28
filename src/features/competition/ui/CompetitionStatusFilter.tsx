import React from 'react';
import style from "./CompetitionStatusFilter.module.css"
type Props = {
    statusFocused:string;
    setStatusFocused: React.Dispatch<React.SetStateAction<string>>;
    name:string;
    id:string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export const CompetitionStatusFilter = ({statusFocused, setStatusFocused, name, id, setPage}:Props) => {
    return (
        <button
            className={statusFocused === id? style.statusButtonFocused : style.statusButton}
            onClick={() => {
                window.scroll(0,80)
                setStatusFocused(id)
                setPage(1)
            }}
        >{name}</button>
    );
};
