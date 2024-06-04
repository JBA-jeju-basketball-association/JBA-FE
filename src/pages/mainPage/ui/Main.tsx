import React, {useState} from 'react';
import {Api} from "../../../shared/api";
import {useNavigate} from "react-router-dom";
import style from "./Main.module.css"

const Main = () => {
    const [userName, setUserName] = useState<string>("");
    const navigate = useNavigate();
    const test = ():void => {
        Api.get("/test")
            .then(res=>{
                console.log(res)
                setUserName(res.data)
            }).catch(err => {
                console.log(err)
        })
    }

    return (
        <div>
            <div>
                <h1>test</h1>
                <button onClick={() => test()}>test button</button>
                <div>{userName}</div>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <button className={style.navigator} onClick={()=> navigate("/competition")}>대회정보 페이지</button>

            </div>

        </div>

    );
};

export default Main;