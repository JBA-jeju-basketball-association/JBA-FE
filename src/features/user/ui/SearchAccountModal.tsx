import React, {useState} from 'react';
import style from "./SearchAccountModal.module.css"
import {CommonModal} from "../../../shared/ui";
import styled from "styled-components";

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

const CategoryBtn = styled.button `
    width: 250px;
    height: 50px;
    border: 1px solid black;
    border-radius: 10px;
    background-color: ${(props) => props.color || "white"};
`
export const SearchAccountModal = ({isModalOpen, setModalOpen}:Props) => {
    const [isEmailSelected, setIsEmailSelected] = useState<boolean>(true);
    return (
        <CommonModal isopen={isModalOpen} onRequestClose={() => setModalOpen(false)} style={customModalStyles}>
            <div className={style.SearchAccountModal}>
                <div className={style.categoryArea}>
                    <CategoryBtn color={isEmailSelected ? "black" : "white"} onClick={() => setIsEmailSelected(true)}>이메일 찾기</CategoryBtn>
                    <CategoryBtn color={isEmailSelected ? "var(--primary-color)" : "white"} onClick={() => setIsEmailSelected(false)}>비밀번호 찾기</CategoryBtn>
                </div>
            </div>
        </CommonModal>
    );
};
