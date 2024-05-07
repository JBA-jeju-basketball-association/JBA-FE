import React, {useState} from 'react';
import style from "./KakaoMap.module.css"
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {place} from "../../../shared/type/CompetitionDetailType";

type Props = {
    places:place[];
}

export const KakaoMap = ({places}:Props) => {
    const [placesNum, setPlacesNum] = useState<number>(0);
    return (

        <div id={"map"} className={style.KakaoMap}>
            <div className={style.buttonArea}>
                {places.map((p:place, index:number)=> {
                    return <button
                        key={index}
                        onClick={()=>setPlacesNum(index)}
                    >{p?.placeName}</button>
                })}
            </div>


            <Map
                center={{ lat: places[placesNum]?.latitude, lng: places[placesNum]?.longitude }}
                level={4}
                className={style.map}
            >
                <MapMarker position={{ lat: places[placesNum]?.latitude, lng: places[placesNum]?.longitude }}>
                    <div>{places[placesNum]?.placeName}</div>
                </MapMarker>
            </Map>
        </div>
    );
};
