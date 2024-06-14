import React, {useState} from 'react';
import style from "./PlaceArea.module.css"
import Modal from "react-modal";
import DaumPostcode, {Address} from "react-daum-postcode";
import axios from "axios";
import {place} from "../../../shared/type/CompetitionType";
import { TiDelete } from "react-icons/ti";


type props = {
    places: place[];
    setPlaces: React.Dispatch<React.SetStateAction<place[]>>;
}

export const PlaceArea = ({places, setPlaces}:props) => {

    const [placeName, setPlaceName] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [latitude, setLatitude] = useState<number>(0);
    const [longitude, setLongitude] = useState<number>(0);

    const customModalStyles: ReactModal.Styles = {
        overlay: {
            backgroundColor: " rgba(0, 0, 0, 0.4)",
            width: "100%",
            height: "100vh",
            zIndex: "10",
            position: "fixed",
            top: "0",
            left: "0",
        },
        content: {
            width: "1000px",
            height: "600px",
            zIndex: "150",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "10px",
            boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
            backgroundColor: "white",
            display:"flex",
            flexDirection:"column",
            overflow: "auto",
        },
    };

    const getLALOInfo = async(address:string):Promise<void>=> {

        const url = 'https://dapi.kakao.com/v2/local/search/address.json?query=' + encodeURI(address);
        await axios.get(url, {
            headers: {
                Authorization: "KakaoAK "+ process.env.REACT_APP_KAKAO_API_KEY
            }
        }).then(res=> {
            setLatitude(res.data.documents[0].y)
            setLongitude(res.data.documents[0].x)
        })
            .catch(err => console.log(err))

    }

    const registPlace = ():void => {
        if (placeName === "") {
            alert("장소명을 입력해주세요.")
            return
        }else if (address === "") {
            alert("주소를 검색해주세요.")
            return
        }
        let place:place = {
            placeName:placeName,
            address:address,
            latitude:latitude,
            longitude:longitude
        }
        setPlaces(prevState => {
            return [...prevState, place]
        })
        setPlaceName("");
        setAddress("");
        setIsOpen(false)
    }

    const deletePlace = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, indexToRemove:number):void => {
        e.preventDefault()
        setPlaces(prevState => prevState.filter((place:place, index:number):boolean => index !== indexToRemove))
    }

    const closeModal = () => {
        setPlaceName("");
        setAddress("");
        setIsOpen(false)
    }

    return (
        <div className={style.PlaceArea}>
            <Modal
                isOpen={isOpen}
                onRequestClose={() => closeModal()}
                ariaHideApp={false}
                contentLabel="주소 검색"
                style={customModalStyles}
            >
                <div className={style.closeButtonArea}>
                    <button onClick={() => closeModal()} className={style.closeButton}>X</button>
                </div>
                <div className={style.addressModalSearchTitle}>
                    <p>{address === "" ? "주소 검색" : "주소 : " + address}</p>
                </div>
                <DaumPostcode
                    onComplete={(data: Address): void => {
                        const address:string = data.jibunAddress!==""? data.jibunAddress : data.autoJibunAddress
                        setAddress(address)
                        getLALOInfo(address)
                    }}
                    autoClose={true}/>
                <div className={style.addressModalSearchTitle}>
                    <p>장소명</p>
                </div>
                <input className={style.placeNameInput} type="text" placeholder={" 예) 사라봉다목적체육관"}
                       onChange={(e) => setPlaceName(e.target.value)}/>
                <div className={style.submitArea}>
                    <button type={"button"} onClick={() => registPlace()}>등록</button>
                </div>
            </Modal>

            <p className={style.searchAddressBtn} onClick={() => setIsOpen(true)}>주소 찾기</p>
            <section className={style.rightBox}>
                <ul className={style.placeList}>
                    {places?.map((place: place, index: number) => (
                        <li key={index} className={style.placeName}>
                            <p>{place.placeName}</p>
                            <button onClick={(e) => deletePlace(e, index)}><TiDelete style={{marginTop: "5px"}} size={16}/></button>
                        </li>
                    ))}
                </ul>

            </section>
        </div>
    );
};
