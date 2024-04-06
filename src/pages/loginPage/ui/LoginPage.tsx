import React, {useState} from 'react';
import PageTitle from "../../../shared/ui/pageTitle/PageTitle";
import style from "./LoginPage.module.css";
import axios from "axios";
import {api} from "../../../app/hocs/api";

const LoginPage = () => {
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const fetchLogin = async ():Promise<void> => {
        api.post("/v1/api/sign/login", {
            email,
            password
        }).then((res):void => {
            console.log(res)
            if (res.status === 200) {
                localStorage.setItem("AccessToken", res.headers["access-token"]);
                localStorage.setItem("RefreshToken", res.headers["refresh-token"])
            }
        }).catch(err => console.log(err.response.data));
    }

    const submitHandler = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        console.log(email,password)
        fetchLogin();
    }


    const getTestHandler = async () => {
        return api.get("/test")
            .then(res => {

                console.log(res)
            }).catch(err => {
                console.log(err)
            });
    }

    const getTest1Handler =  async () => {
        return api.get("/v1/api/sign/test1")
            .then(res=> {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <div className={style.LoginPage}>
            <PageTitle pageName={"로그인"} />
            <form className={style.formBox} onSubmit={(e) => submitHandler(e)}>
                <div className={style.boxArea}>
                    <div className={style.labelArea}>
                        <label>이메일</label>
                    </div>
                    <div className={style.inputArea}>
                        <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className={style.boxArea}>
                    <div className={style.labelArea}>
                        <label>비밀번호</label>
                    </div>
                    <div className={style.inputArea}>
                        <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>

                <button type="submit" className={style.submitButton}>로그인</button>
            </form>

            <div>
                <a onClick={()=>getTestHandler()} style={{margin:"10px", width:"100px", height:"100px", backgroundColor:"lightgray"}}>테스트</a>
                <div  style={{margin:"10px", width:"100px", height:"100px", backgroundColor:"red"}}>없음</div>
            </div>
            {/*<div>*/}
            {/*    <a onClick={()=>testHandler()} style={{margin:"10px", width:"100px", height:"100px", backgroundColor:"lightgray"}}>refresh</a>*/}
            {/*    <div  style={{margin:"10px", width:"100px", height:"100px", backgroundColor:"red"}}>test</div>*/}
            {/*</div>*/}
        </div>
    );
};

export default LoginPage;