import React, {useState} from 'react';
import Api from "../../../app/hocs/Api";
import {useNavigate} from "react-router-dom";

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
            <div>
                <div>대회정보 등록 페이지로</div>
                <button onClick={()=> navigate("/add-competition")}>gogo</button>
            </div>

        </div>

    );
};

export default Main;