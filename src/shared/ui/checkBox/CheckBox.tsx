import React from 'react';
import style from "./CheckBox.module.css"

type Props = {
    isChecked: boolean;
    setIsChecked?: React.Dispatch<React.SetStateAction<boolean>>;
    setFC?: (checked: boolean) => void;
    content: string
}
export const CheckBox = ({isChecked, setIsChecked, content, setFC}:Props) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (setIsChecked) {
            setIsChecked(e.target.checked);
        } else if (setFC) {
            setFC(e.target.checked);
        }
    };
    return (
        <label className={style.checkBoxLabel}>
            <input
                type={"checkbox"}
                checked={isChecked}
                onChange={handleChange}
            />
            <span className={style.checkBoxIcon}></span>
            <span>{content}</span>
        </label>
    );
};
