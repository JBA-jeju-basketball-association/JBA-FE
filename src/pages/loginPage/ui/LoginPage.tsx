import React, {useState} from 'react';
import PageTitle from "../../../shared/ui/pageTitle/PageTitle";
import style from "./LoginPage.module.css";
import {api} from "../../../app/hocs/api";
import {useMutation, useQuery} from "@tanstack/react-query";

const LoginPage = () => {

    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const fetchLogin = async () => {
        api.post("/v1/api/sign/login",{
            email,
            password
        },{
            headers: {
                "access-token": "",
            }
        }).then((res) => {
                if (res.status === 200) {
                    console.log(res)
                }
            })
            .catch(err => console.log(err.message))
    }

    // const {data, isError, error, isLoading} = useQuery({
    //     queryKey:["login"],
    //     queryFn:fetchLogin,
    //     retry: false
    // })



    const submitHandler = (e:React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault()
        console.log(email,password)
        fetchLogin();
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
        </div>
    );
};

export default LoginPage;