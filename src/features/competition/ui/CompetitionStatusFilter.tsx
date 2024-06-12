import React from 'react';
import style from "./CompetitionStatusFilter.module.css"
type Props = {
    statusFocused:string;
    setStatusFocused: React.Dispatch<React.SetStateAction<string>>;
    name:string;
    id:string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    end?:string;
}

export const CompetitionStatusFilter = ({statusFocused, setStatusFocused, name, id, setPage, end}:Props) => {
    return (
        <button
            style={end ? {borderRight: "none"} : {}}
            className={statusFocused === id? style.statusButtonFocused : style.statusButton}
            onClick={() => {
                setStatusFocused(id)
                setPage(1)
            }}
        >{name}</button>
    );
};
