import React, {Dispatch, useState} from 'react';
import style from "./ProfileForm.module.css"
import {ProfileRow} from "../../../entities/user";
import {useNavigate} from "react-router-dom";
import {ProfileUserInfo} from "../../../shared/type/UserType";
import {UpdatePasswordModal} from "../../../features/user";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";

type Props = {
    setIsProfileForm: React.Dispatch<React.SetStateAction<boolean>>;
    data: ProfileUserInfo;
}
export const ProfileForm = ({setIsProfileForm, data}:Props) => {
    // 이메일, 이름, 권한, 연락처, 생년월일, 성별, 소속팀
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const editProfileHandler = () => {
        confirmAndCancelAlertWithLoading("warning", "프로필 변경", "프로필을 변경하시겠습니까?", () => {
            setIsProfileForm(false);
        })
    }
    const editPasswordHandler = () => {
        confirmAndCancelAlertWithLoading("warning", "비밀번호 변경", "비밀번호를 변경하시겠습니까?", () => {
            setIsModalOpen(true);
        })
    }

    return (
        <div className={style.ProfileForm}>
            <div className={style.profileTitleArea}>
                <p>프로필</p>
                <div className={style.profileTitleBtnArea}>
                    <button onClick={() => editPasswordHandler()}>비밀번호 변경</button>
                    <button onClick={() => editProfileHandler()}>프로필 편집</button>
                </div>
            </div>
            {data &&
                <div className={style.profileArea}>
                    <ProfileRow name={"이름(권한)"} content={`${data.name}(${data.role})`}/>
                    <ProfileRow name={"이메일"} content={data.email}/>
                    <ProfileRow name={"휴대폰번호"} content={data.phoneNum}/>
                    <ProfileRow name={"생년월일"} content={data.birth}/>
                    <ProfileRow name={"소속팀"} content={data.team}/>
                </div>
            }
            <UpdatePasswordModal isModalOpen={isModalOpen} setModalOpen={setIsModalOpen}/>
        </div>
    );
};
