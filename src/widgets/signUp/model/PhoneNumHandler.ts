import React from "react";


export default function PhoneNumHandler(e: React.ChangeEvent<HTMLInputElement>, setValue:any) {
    let value:string = e.target.value;

    // 숫자만 남기기
    value = value.replace(/\D/g, '');

    // 11자리까지만 허용
    if (value.length > 11) {
        value = value.slice(0, 11);
    }

    // 형식에 맞게 하이픈 추가
    if (value.length > 3 && value.length <= 7) {
        value = value.replace(/(\d{3})(\d+)/, '$1-$2');
    } else if (value.length > 7) {
        value = value.replace(/(\d{3})(\d{4})(\d+)/, '$1-$2-$3');
    }

    setValue("phoneNum", value);
}