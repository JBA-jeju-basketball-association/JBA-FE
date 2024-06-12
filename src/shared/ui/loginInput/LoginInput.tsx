import React from 'react';
import style from "./LoginInput.module.css"


type Props = {
    type: string;
    setFn: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    value:string;
}


export const LoginInput = ({type, setFn, placeholder, value}:Props) => {
    return (
        <input className={style.input} type={type} onChange={(e) => setFn(e.target.value)} placeholder={placeholder} value={value}/>
    );
};
