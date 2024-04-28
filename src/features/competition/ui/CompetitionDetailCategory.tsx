import React, {useState} from 'react';
import style from "./CompetitionDetailCategory.module.css"
export const CompetitionDetailCategory = () => {
    const [infoFocused, setInfoFocused] = useState<boolean>(true);


    return (
        <div className={style.CompetitionDetailCategory}>
            <button className={infoFocused?style.isFocused:style.isNotFocused}
                    onClick={()=>setInfoFocused(true)}
            >
                <p>대회개요</p>
            </button>
            <button className={infoFocused?style.isNotFocused:style.isFocused}
                    onClick={()=>setInfoFocused(false)}
            >
                <p>대회결과</p>
            </button>
        </div>
    );
};
