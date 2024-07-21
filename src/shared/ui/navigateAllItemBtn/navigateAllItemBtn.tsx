import React from 'react';
import style from "./navigateAllItemBtn.module.css"
import {useNavigate} from "react-router-dom";

type Props = {
    path: string;
    color: string
}
export const NavigateAllItemBtn = ({path, color}:Props) => {
    const navigate = useNavigate();
    const navigateHandler = () => {
        navigate(path);
        window.scrollTo(0,0)
    }
    return (
        <button onClick={() => navigateHandler()} className={style.button} style={{backgroundColor: color}}>
            전체보기
        </button>
    );
};
