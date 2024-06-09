import React from 'react';
import style from "./Banner.module.css"
import {useNavigate} from "react-router-dom";
export const Banner = () => {
    const navigate = useNavigate();
    return (
        <div className={style.bannerContainer}>
            <div className={style.Banner}>
                <h1 lang={"en"} className={style.JBA}>JBA</h1>
                <h2 lang={"en"} className={style.JBAFullName}>Jeju Basketball Association</h2>
                <p className={style.content1}>농구를 활성화하여 제주도민의 체력을 향상시키고 건전하고 활기찬 분위기를 조성하고자 하는 가치를 품고 있습니다. 농구를 통한 즐겁고
                    건강한 활동을 촉진하고 선수와 단체를 통해 농구의 가치를 홍보하며 우수한 농구 인재를 발굴함으로써 제주 체육 발전에 기여하고자 합니다.</p>
                <p className={style.content2}>우리는 제주의 모든 연령층에게 농구를 보급하고 지속적인 훈련과 경기의 기회를 제공하여 농구의 매력을 널리 알리는 것을 목표로 활동하고
                    있으며 제주 지역 사회에 활력을 불어 넣고 체육 문화의 발전에 기여 합니다.</p>
                <button className={style.detailBtn} onClick={()=> navigate("/history")}>자세히보기</button>
            </div>
        </div>

    );
};
