import {api} from "../../../app/hocs/api";
import {NavigateFunction} from "react-router-dom";


const fetchLogout = (token:string | null, setToken:(token: (string | null)) => void, navigate:NavigateFunction):void => {
    api.post("/v1/api/sign/logout", null, {
        headers: {
            AccessToken: token,
        }
    }).then(res => {
        console.log(res)
        setToken(null);
        localStorage.removeItem("AccessToken")
        localStorage.removeItem("RefreshToken")
        navigate("/login")
    }).catch(err => {
        console.log(err)
        if (err.response.status === 400) {
            setToken(null);
            localStorage.removeItem("AccessToken")
            localStorage.removeItem("RefreshToken")
            navigate("/login")
        }
    })
}

export default fetchLogout;