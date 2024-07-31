import React, {useEffect, useState} from 'react';
import style from "./UpdateProfileForm.module.css"
import {SubmitHandler, useForm} from "react-hook-form";
import PhoneNumHandler from "../../signUp/model/PhoneNumHandler";
import BirthHandler from "../../signUp/model/BirthHandler";
import {ProfileUserInfo} from "../../../shared/type/UserType";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import FetchUpdateProfile from "../api/FetchUpdateProfile";

type Props = {
    setIsProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
    data: ProfileUserInfo;
}
export type FormData = {
    name: string;
    phoneNum: string;
    team: string;
    birth: string;
}
export const UpdateProfileForm = ({setIsProfileForm, data}:Props) => {
    const {register, setValue, handleSubmit, formState:{ errors}, getValues} = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = (data) => {
        confirmAndCancelAlertWithLoading("question", "프로필 수정", "프로필을 정말 수정하시겠습니까?", async() => {
            await FetchUpdateProfile(data)
        })
    }
    console.log(data?.birth.substring(0,1))

    useEffect(() => {
        let birthOf7th;
        if (data?.birth.substring(0,1) === "0" && data?.gender === "MALE") {
            birthOf7th = "3";
        }else if (data?.birth.substring(0,1) === "0" && data?.gender === "FEMALE") {
            birthOf7th = "4";
        }else if (data?.birth.substring(0,1) !== "0" && data?.gender === "MALE") {
            birthOf7th = "1";
        }else {
            birthOf7th = "2"
        }
        setValue("name",data?.name)
        setValue("phoneNum",data?.phoneNum)
        setValue("birth",data?.birth + "-" + birthOf7th)
        setValue("team",data?.team)
    }, [data]);

    return (
        <div className={style.UpdateProfileForm} onSubmit={() => onSubmit}>
            <div className={style.updateProfileTitleArea}>
                <p>프로필 편집</p>
                <button onClick={() => setIsProfileForm(true)}>돌아가기</button>
            </div>
            <form className={style.updateProfileArea} onSubmit={handleSubmit(onSubmit)}>
                <div className={style.ProfileRow}>
                    <div className={style.nameArea}>
                        <p>이름</p>
                    </div>
                    <input {...register("name")} type={"text"}/>
                </div>
                <div className={style.ProfileRow}>
                    <div className={style.nameArea}>
                        <p>휴대폰번호</p>
                    </div>
                    <input {...register("phoneNum")} type={"text"} onChange={(e) => PhoneNumHandler(e, setValue)}/>
                </div>
                <div className={style.ProfileRow}>
                    <div className={style.nameArea}>
                        <p>주민번호 앞 7자리</p>
                    </div>
                    <input {...register("birth")} type={"text"} onChange={(e) => BirthHandler(e, setValue)}/>
                </div>
                <div className={style.ProfileRow}>
                    <div className={style.nameArea}>
                        <p>소속팀</p>
                    </div>
                    <input {...register("team")} type={"text"} placeholder={"소속팀이 없을 경우 '무소속' 입력해주세요"}/>
                </div>
                <div className={style.submitBtnArea}>
                    <button type={"submit"}>수정하기</button>
                </div>
            </form>
        </div>
    );
};
