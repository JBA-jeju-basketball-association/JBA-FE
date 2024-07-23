import React from 'react';
import style from "./HeaderGoToBtn.module.css";
import {useNavigate} from "react-router-dom";

type Props = {
    path: string;
    content: string;
}
export const HeaderGoToBtn = ({path, content}:Props) => {
    const navigate = useNavigate();
    return (
        <button className={style.HeaderGoToBtn} onClick={() => navigate(`/${path}`)}>
            {content}
        </button>
    );
};
