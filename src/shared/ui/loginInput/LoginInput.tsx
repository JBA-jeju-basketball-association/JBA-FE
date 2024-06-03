import React from 'react';
import style from "./LoginInput.module.css"


type Props = {
    type: string;
    setFn: React.Dispatch<React.SetStateAction<string>>
}


export const LoginInput = ({type, setFn}:Props) => {
    return (
        <div className={style.LoginInput}>
            <input type={type} onChange={(e) => setFn(e.target.value) }/>
        </div>
    );
};
