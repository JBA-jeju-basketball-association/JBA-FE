import React from 'react';
import style from "./LoginLabel.module.css"

type Props = {
    name:string;
}
export const LoginLabel = ({name}:Props) => {

    return (
        <div className={style.LoginLabel}>
            <label>{name}</label>
        </div>
    );
};
