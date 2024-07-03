import React from "react";


export default function BirthHandler (e: React.ChangeEvent<HTMLInputElement> ,setValue:any) {
    let value:string = e.target.value;

    // 숫자만 남기기
    value = value.replace(/\D/g, '');

    // 7자리까지만 허용
    if (value.length > 7) {
        value = value.slice(0, 7);
    }

    // 형식에 맞게 하이픈 추가
    value = value.replace(/(\d{6})(\d+)/, '$1-$2');

    setValue("birth", value);
};