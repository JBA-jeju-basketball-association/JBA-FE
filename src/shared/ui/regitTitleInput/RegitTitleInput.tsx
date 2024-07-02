import React from 'react';
import style from "./RegitTitleInput.module.css"

type Props = {
    placeholder:string;
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}
export const RegitTitleInput = ({placeholder, title, setTitle}:Props) => {
    return (
        <div className={style.RegitTitleInput}>
            <input
                type={"text"}
                placeholder={placeholder}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                defaultValue={""}
            />
        </div>
    );
};
