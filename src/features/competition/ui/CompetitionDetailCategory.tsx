import React from 'react';
import style from "./CompetitionDetailCategory.module.css"
import {useUserStore} from "../../../shared/model";
import {JwtDecoder} from "../../../shared/lib";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2"
import confirmAlert from "../../../shared/lib/alert/ConfirmAlert";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";


type Props = {
    infoFocused:boolean;
    setInfoFocused: React.Dispatch<React.SetStateAction<boolean>>;
    phase: string;
}
export const CompetitionDetailCategory = ({infoFocused,setInfoFocused, phase}:Props) => {
    const {AccessToken} = useUserStore();
    const navigate = useNavigate();
    const {id} = useParams();

    function resultClickHandler() {
        const role:string | null = AccessToken ? JwtDecoder(AccessToken).role : null;

        if (phase === "INFO") {
            if (AccessToken && (role === "ROLE_MASTER" || role === "ROLE_ADMIN")) {
                confirmAndCancelAlertWithLoading("warning", "대회일정이 없습니다.", "대회일정 등록 페이지로 이동합니다.")
                    .then(res => {
                        if (res.isConfirmed) id && navigate(`/competition/post/schedule/${id}`)
                    });
            } else if (!AccessToken || (role !== "ROLE_MASTER" && role !== "ROLE_ADMIN")) {
                confirmAlert("warning", "대회일정이 없습니다.");
            }
        }else {
            setInfoFocused(false)
        }
    }

    return (
        <div className={style.CompetitionDetailCategory}>
            <button className={infoFocused?style.isFocused:style.isNotFocused}
                    onClick={()=>setInfoFocused(true)}
            >
                <p>대회개요</p>
            </button>
            <button className={infoFocused?style.isNotFocused:style.isFocused}
                    onClick={()=> resultClickHandler()}
            >
                <p>{phase === "INFO" || phase === "SCHEDULE" ? "대회일정" : "대회결과"}</p>
            </button>
        </div>
    );
};
