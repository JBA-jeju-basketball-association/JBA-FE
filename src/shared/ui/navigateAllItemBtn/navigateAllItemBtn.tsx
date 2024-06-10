import React from 'react';
import style from "./navigateAllItemBtn.module.css"
import {useNavigate} from "react-router-dom";

type Props = {
    path: string;
    color: string
}
export const NavigateAllItemBtn = ({path, color}:Props) => {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(path)} className={style.button} style={{backgroundColor: color}}>
            전체보기
        </button>
    );
};
