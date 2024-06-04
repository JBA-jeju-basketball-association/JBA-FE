import React from 'react';
import style from "./CompetitionDetailCategory.module.css"
import {useUserStore} from "../../../shared/model";
import {JwtDecoder} from "../../../shared/lib";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2"
import confirmAlert from "../../../shared/lib/ConfirmAlert";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/ConfirmAndCancelAlertWithLoading";


type Props = {
    infoFocused:boolean;
    setInfoFocused: React.Dispatch<React.SetStateAction<boolean>>;
    existResult: boolean;
}
export const CompetitionDetailCategory = ({infoFocused,setInfoFocused, existResult}:Props) => {
    const {AccessToken} = useUserStore();
    const navigate = useNavigate();
    const {id} = useParams();

    function resultClickHandler() {
        if (!existResult && AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER") {
            confirmAndCancelAlertWithLoading("warning", "대회결과가 없습니다.", "대회결과 등록 페이지로 이동합니다.")
                .then(res => {
                    if (res.isConfirmed) id && navigate(`/competition/add-result/${id}`)
                });
        }else if((!existResult && AccessToken && JwtDecoder(AccessToken).role !== "ROLE_MASTER")) {
            confirmAlert("warning", "대회결과가 없습니다.");
        }else {
            setInfoFocused(false);
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
                <p>대회결과</p>
            </button>
        </div>
    );
};
