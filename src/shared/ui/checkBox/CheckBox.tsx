import React from 'react';
import style from "./CheckBox.module.css"

type Props = {
    isChecked: boolean;
    setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
    content: string
}
export const CheckBox = ({isChecked, setIsChecked, content}:Props) => {
    return (
        <label className={style.checkBoxLabel}>
            <input type={"checkbox"} checked={isChecked} onClick={() => setIsChecked(!isChecked)}/>
            <span className={style.checkBoxIcon}></span>
            <span>{content}</span>
        </label>
    );
};
