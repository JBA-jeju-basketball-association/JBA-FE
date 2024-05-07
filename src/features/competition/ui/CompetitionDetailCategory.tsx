import React from 'react';
import style from "./CompetitionDetailCategory.module.css"

type Props = {
    infoFocused:boolean;
    setInfoFocused: React.Dispatch<React.SetStateAction<boolean>>;
    existResult: boolean;
}
export const CompetitionDetailCategory = ({infoFocused,setInfoFocused, existResult}:Props) => {


    function resultClickHandler() {
        if (existResult) setInfoFocused(false)
        else alert("대회결과가 없습니다.")
    }

    return (
        <div className={style.CompetitionDetailCategory}>
            <button className={infoFocused?style.isFocused:style.isNotFocused}
                    onClick={()=>setInfoFocused(true)}
            >
                <p>대회개요</p>
            </button>
            <button className={infoFocused?style.isNotFocused:style.isFocused}
                    onClick={()=> resultClickHandler()}
            >
                <p>대회결과</p>
            </button>
        </div>
    );
};
