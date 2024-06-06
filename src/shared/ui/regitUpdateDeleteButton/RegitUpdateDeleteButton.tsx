import React from 'react';
import style from "./RegitUpdateDeleteButton.module.css"


type Props = {
    onClickHandler?: () => void;
    content: string;
};

export const RegitUpdateDeleteButton = ({content, onClickHandler}:Props) => {
    return (
        <button onClick={onClickHandler} className={style.Button}>
            {content}
        </button>
    );
};
