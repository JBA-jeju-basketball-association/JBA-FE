import React, {useState} from 'react';
import style from "../../signUp/ui/SignUpPage/SignUpPage.module.css";
import {WhiteLogo} from "../../../shared/model";
import {ProfileForm, UpdateProfileForm} from "../../../widgets/user";
import {useQuery} from "@tanstack/react-query";
import FetchGetUserInfo from "../api/FetchGetUserInfo";

export const ProfilePage = () => {
    const [isProfileForm, setIsProfileForm] = useState<boolean>(true);

    const {data} = useQuery({
        queryKey:["getUserInfo"],
        queryFn: ()=> FetchGetUserInfo(),
        select: (result) => result?.data?.data
    })
    return (
        <div>
            <div className={style.SignUpPage}>
                <div className={style.overlay}>
                    <div className={style.centerBox}>
                        <div className={style.logoArea}>
                            <div className={style.logoAreaOverlay}>
                                <WhiteLogo/>
                                <div className={style.logoBar}></div>
                                <p className={style.hiContent}>반갑습니다!</p>
                                <p className={style.welcomeContent}>회원님의 방문을</p>
                                <p className={style.welcomeContent}>진심으로 환영합니다.</p>
                            </div>
                        </div>
                        <div className={style.signUpArea}>
                            {isProfileForm ?
                                <ProfileForm setIsProfileForm={setIsProfileForm} data={data}/>
                                :
                                <UpdateProfileForm setIsProfileForm={setIsProfileForm} data={data}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
