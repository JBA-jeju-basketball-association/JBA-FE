import React, {useState} from 'react';
import style from "./SearchEmailBox.module.css"
import {useForm} from "react-hook-form";
import FetchPostFindEmail from "../api/FetchPostFindEmail";
import PhoneNumHandler from "../../../widgets/signUp/model/PhoneNumHandler";


export type findEmailRequest = {
    name: string;
    phoneNum: string;
    birth: number;
}
const SearchEmailBox = () => {
    const [foundEmail, setFoundEmail] = useState<string>("");
    const {register, setValue, handleSubmit, formState:{ errors}, getValues} = useForm<findEmailRequest>();
    const onSubmit = handleSubmit(data => {
        FetchPostFindEmail(data, setFoundEmail);
    })

    return (
        <div className={style.SearchEmailBox}>
            {foundEmail === "" ?
                <form onSubmit={onSubmit} className={style.formArea}>
                    <div>
                        <label>이름</label>
                        <input {...register("name")} type={"text"}/>
                    </div>
                    <div>
                        <label>핸드폰번호</label>
                        <input {...register("phoneNum")} type={"text"} onChange={(e) => PhoneNumHandler(e, setValue)}/>
                    </div>
                    <div>
                        <label>생년월일 8자리</label>
                        <input {...register("birth")} type={"number"} placeholder={"'-' 를 빼고 입력해주세요"}/>
                    </div>
                    <button type={"submit"}>찾기</button>
                </form>
                :
                <div className={style.foundEmailArea}>
                    <p>{foundEmail}</p>
                </div>
            }
        </div>
    );
};

export default SearchEmailBox;