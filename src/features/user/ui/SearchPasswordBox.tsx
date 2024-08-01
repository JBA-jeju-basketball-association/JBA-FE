import React, {useEffect, useState} from 'react';
import style from "./SearchPasswordBox.module.css"
import FetchSendCertificationMailInFindPW from "../api/FetchSendCertificationMailInFindPW";
import FetchCheckFindPasswordCertNum from "../api/FetchCheckFindPasswordCertNum";
import FetchPostUpdatePassword from "../api/FetchPostUpdatePassword";

export type findPasswordRequest = {
    name: string;
    birth: number;
    email: string;
    certificationNum: number;
}
const SearchPasswordBox = () => {
    const [sendMail, setSendMail] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(300);
    const [successCert, setSuccessCert] = useState<boolean>(false);

    const [name, setName] = useState<string>("");
    const [birth, setBirth] = useState<number | null>(null);
    const [email, setEmail] = useState<string>("");
    const [certificationNum, setCertificationNum] = useState<number | null>(null);
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const sendCertificationMail = () => {
        setTimeLeft(300);
        FetchSendCertificationMailInFindPW(name, birth, email, certificationNum, setSendMail)
    }

    const findPassword = async () => {
        await FetchCheckFindPasswordCertNum(email, certificationNum, setSuccessCert)
    }

    const updatePassword = async () => {
        await FetchPostUpdatePassword(password,confirmPassword, certificationNum, email)
    }

    useEffect(() => {
        let timer:any;
        if (sendMail && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prevState => prevState - 1);
            }, 1000)
        }else if(timeLeft === 0) {
            clearInterval(timer)
        }
        return () => clearInterval(timer)
    }, [sendMail, timeLeft]);

    return (
        <div className={style.SearchPasswordBox}>
            {
                !successCert
                    ?
                    <div className={style.formArea}>
                        <div>
                            <label>이름</label>
                            <input type={"text"} className={sendMail ? style.disableInput : style.ableInput} id={"1"}
                                   disabled={sendMail} onChange={(e) => setName(e.target.value)}/>
                        </div>
                        <div>
                            <label>생년월일 8자리</label>
                            <input type={"number"} className={sendMail ? style.disableInput : style.ableInput}
                                   disabled={sendMail} placeholder={"'-' 를 빼고 입력해주세요"} id={"2"}
                                   onChange={(e) => setBirth(Number(e.target.value))}/>
                        </div>
                        <div>
                            <label>이메일</label>
                            <input type={"email"} className={sendMail ? style.disableInput : style.ableInput} id={"3"}
                                   disabled={sendMail} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        {
                            sendMail
                                ?
                                <div className={style.certificationNumArea}>
                                    <label>인증번호</label>
                                    <input type={"number"} className={style.ableInput} id={"4"}
                                           onChange={(e) => setCertificationNum(Number(e.target.value))}/>
                                    <p>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
                                </div>
                                :
                                null
                        }
                        <div className={style.btnArea}>
                            <button onClick={() => sendCertificationMail()}>{sendMail ? "인증번호 재발송" : "인증번호 발송"}</button>
                            {sendMail ? <button onClick={() => findPassword()}>인증완료</button> : null}
                        </div>
                    </div>
                    :
                    <div className={style.formArea}>
                        <p className={style.limitTime}>{"제한 시간 : " + Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</p>
                        <div>
                            <label>새 비밀번호</label>
                            <input type={"password"} className={style.ableInput} value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div>
                            <label>새 비밀번호 확인</label>
                            <input type={"password"} className={style.ableInput} value={confirmPassword}
                                   onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <div className={style.btnArea}>
                            <button onClick={() => updatePassword()}>비밀번호 변경</button>
                        </div>
                    </div>
            }
        </div>
    );
};

export default SearchPasswordBox;