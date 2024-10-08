import {NormalApi} from "../../../shared/api";
import {NavigateFunction} from "react-router-dom";


const fetchLogout = (AccessToken:string | null, setAccessToken:(token: (string | null)) => void, navigate:NavigateFunction):void => {
    NormalApi.post("/v1/api/sign/logout-cookie", null, {
        headers: {
            Authorization: AccessToken,
        }
    }).then(res => {
        setAccessToken(null);
        navigate("/login")
    }).catch(err => {
        console.log(err)
        if (err.response.status === 400 || err.response.status === 401) {
            setAccessToken(null);
            navigate("/login")
        }
    })
}

export default fetchLogout;