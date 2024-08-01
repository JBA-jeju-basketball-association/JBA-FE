import React, {useState} from 'react';
import style from "./SearchAccountModal.module.css"
import {CommonModal} from "../../../shared/ui";
import SearchPasswordBox from "./SearchPasswordBox";
import SearchEmailBox from "./SearchEmailBox";

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
        width: "700px",
        height: "500px",
        zIndex: "102",
        position: "absolute",
        top: "40%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        border: "none",
        borderRadius: "20px",
        padding: "0",
        display:"flex",
        justifyContent:"center",
        alignItems:"flex-start"
    },
};


export const SearchAccountModal = ({isModalOpen, setModalOpen}:Props) => {
    const [isEmailSelected, setIsEmailSelected] = useState<boolean>(true);
    return (
        <CommonModal isopen={isModalOpen} onRequestClose={() => setModalOpen(false)} style={customModalStyles}>
            <button className={style.xBtn} onClick={() => setModalOpen(false)}>x</button>
            <div className={style.SearchAccountModal}>
                <div className={style.categoryArea}>
                    <button className={isEmailSelected ? style.selectedCategory : style.unSelectedCategory}
                            style={{borderRadius: "10px 0 0 10px"}} onClick={() => setIsEmailSelected(true)}>이메일 찾기
                    </button>
                    <button className={isEmailSelected ? style.unSelectedCategory : style.selectedCategory}
                            style={{borderRadius: "0 10px 10px 0"}} onClick={() => setIsEmailSelected(false)}>비밀번호 찾기
                    </button>
                </div>
                <div>
                    {isEmailSelected ? <SearchEmailBox/> : <SearchPasswordBox/>}
                </div>
            </div>
        </CommonModal>
    );
};
