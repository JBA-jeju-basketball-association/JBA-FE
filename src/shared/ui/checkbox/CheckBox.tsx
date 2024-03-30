import React from 'react';
import style from "./CheckBox.module.css"

type Props = {
    name:string;
    value:string
}
const CheckBox = ({name, value}:Props) => {
    return (
        <input type={"checkbox"} name={name} value={value} className={style.CheckBox}>

        </input>
    );
};

export default CheckBox;