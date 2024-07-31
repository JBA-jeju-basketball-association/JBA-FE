import React from 'react';
import style from "./UpdatePasswordModal.module.css"
import {CommonModal} from "../../../shared/ui";
import confirmAndCancelAlertWithLoading from "../../../shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import FetchUpdatePW from "../api/FetchUpdatePW";
import {useUserStore} from "../../../shared/model";
import {useForm} from "react-hook-form";


type Props = {
    isModalOpen: boolean;
    setModalOpen: (isOpen: boolean) => void;

}

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: " rgba(0, 0, 0, 0.8)",
        width: "100%",
        height: "100vh",
        zIndex: "101",
        position: "fixed",
        top: "0",
        left: "0",
    },
    content: {
        width: "500px",
        height: "300px",
        zIndex: "102",
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "none",
        borderRadius: "20px",
        padding: "0"
    },
};

type FormData = {
    prevPW:string;
    newPW:string;
    newPWConfirm:string;
}

export const UpdatePasswordModal = ({isModalOpen, setModalOpen}:Props) => {
    const {register, setValue, handleSubmit, formState:{ errors}, getValues} = useForm<FormData>();
    const {setAccessToken} = useUserStore();

    const onSubmit = handleSubmit((data) => {
        confirmAndCancelAlertWithLoading("warning", "비밀번호 변경", "비밀번호를 변경하시겠습니까?", async () => {
            await FetchUpdatePW(data, setAccessToken)
        });
    })
    const handleRequestClose = (event:any) => {
        // Enter 키가 눌렸을 때 모달이 닫히지 않도록 처리합니다.
        if (event.type === 'keydown' && event.key === 'Enter') {
            event.preventDefault();
            onSubmit()
        }
    };



    return (
        <CommonModal isopen={isModalOpen} onRequestClose={() => setModalOpen(false)} style={customModalStyles}>
            <form onSubmit={onSubmit}>
                <div className={style.closeBtnArea} onClick={() => setModalOpen(false)}>
                    <div></div>
                    <p>비밀번호 변경</p>
                    <button>X</button>
                </div>
                <div className={style.row}>
                    <p>현재 비밀번호</p>
                    <input type={"password"} {...register("prevPW")} onKeyDown={handleRequestClose}/>
                </div>
                <div className={style.row}>
                    <p>새 비밀번호</p>
                    <input type={"password"} {...register("newPW")} onKeyDown={handleRequestClose}/>
                </div>
                <div className={style.row}>
                    <p>새 비밀번호 확인</p>
                    <input type={"password"} {...register("newPWConfirm")} onKeyDown={handleRequestClose}/>
                </div>
                <div className={style.submitBtnArea} >
                    <button type={"submit"} >변경</button>
                </div>
                <div className={style.infoArea}>
                    <p className={style.infoMessage}>비밀번호는 영문, 숫자, 특수 문자를 꼭 포함하며, 8자 이상 20자 이하여야 합니다.</p>
                </div>
            </form>
        </CommonModal>
    );
};
