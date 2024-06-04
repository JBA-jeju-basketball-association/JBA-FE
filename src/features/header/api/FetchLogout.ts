import {NormalApi} from "../../../shared/api";
import {NavigateFunction} from "react-router-dom";


const fetchLogout = (AccessToken:string | null, setAccessToken:(token: (string | null)) => void, setRefreshToken:(token:(string | null)) => void, navigate:NavigateFunction):void => {
    NormalApi.post("/v1/api/sign/logout", null, {
        headers: {
            AccessToken: AccessToken,
        }
    }).then(res => {
        setAccessToken(null);
        setRefreshToken(null);
        navigate("/login")
    }).catch(err => {
        console.log(err)
        if (err.response.status === 400 || err.response.status === 401) {
            setAccessToken(null);
            setRefreshToken(null);
            navigate("/login")
        }
    })
}

export default fetchLogout;