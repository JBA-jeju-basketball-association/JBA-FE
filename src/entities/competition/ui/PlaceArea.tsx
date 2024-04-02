import React, {useState} from 'react';
import style from "./PlaceArea.module.css"

const PlaceArea = () => {

    const [placeName, setPlaceName] = useState<string>("")

    console.log(placeName)

    return (
        <div className={style.PlaceArea}>
            {/*장소 등록 area*/}
            <section className={style.leftBox}>
                <div className={style.inputArea}>
                    <div className={style.placeNameArea}>
                        <div className={style.placeNameAreaLabel}>
                            <p>장소명</p>
                        </div>
                        <input type="text"
                               onChange={(e) => setPlaceName(e.target.value)}
                               placeholder="장소명을 입력해주세요"
                        />
                    </div>
                    <div className={style.searchPlaceArea}>
                        <button>주소검색</button>
                        <input type="text" readOnly/>
                    </div>
                </div>
                <div className={style.buttonArea}>
                    <button>등록</button>
                </div>

            </section>
            {/*등록된 장소 보여주는 area*/}
            <section className={style.rightBox}>
                <ul className={style.placeList}>
                    <li>-사라봉다목적체육관  x</li>
                    <li>-제주제일중학교체육관  x</li>
                </ul>

            </section>
        </div>
    );
};

export default PlaceArea;