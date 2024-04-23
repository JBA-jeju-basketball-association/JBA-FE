import React, {useState} from 'react';
import Api from "../../../app/hocs/Api";

const Main = () => {
    const [userName, setUserName] = useState<string>("");

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
            <h1>test</h1>
            <button onClick={() => test()}>test button</button>
            <div>{userName}</div>
        </div>
    );
};

export default Main;