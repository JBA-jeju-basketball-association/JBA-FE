import React from 'react';
import DaumPostcode from "react-daum-postcode"
import Modal from "react-modal"

type Props = {
    zipcode: string;
    roadAddress: string;
    setZipcode:  React.Dispatch<React.SetStateAction<string>>
    setRoadAddress:  React.Dispatch<React.SetStateAction<string>>
    isOpen: boolean;
    setIsOpen:  React.Dispatch<React.SetStateAction<boolean>>

}

const CustomDaumPostcode = ({zipcode, roadAddress, setZipcode, setRoadAddress, isOpen, setIsOpen}:Props) => {
    const completeHandler = (data:any) =>{
        setZipcode(data.zonecode);
        setRoadAddress(data.roadAddress);
        setIsOpen(false); //추가
    }

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0,0,0,0.5)",
        },
        content: {
            left: "0",
            margin: "auto",
            width: "500px",
            height: "600px",
            padding: "0",
            overflow: "hidden",
        },
    };

    const toggle = () =>{
        setIsOpen(!isOpen);
        console.log(isOpen)
    }




    return (
        <div>
            {/*<button onClick={toggle}>우편번호 검색</button>*/}
            <input value={zipcode} readOnly placeholder="우편번호"/>
            <br/>
            <input value={roadAddress} readOnly placeholder="도로명 주소"/>
            <br/>

            <Modal isOpen={isOpen} ariaHideApp={false} style={customStyles}>
                <DaumPostcode onComplete={completeHandler}/>
            </Modal>
            {/*<input type="text" onChange={changeHandler} value={detailAddress} placeholder="상세주소"/>*/}
            {/*<br/>*/}
            {/*<button onClick={clickHandler}>클릭</button>*/}
        </div>
    );
};

export default CustomDaumPostcode;