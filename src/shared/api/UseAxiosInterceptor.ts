import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useEffect} from "react";
import {useUserStore} from "../model";
import {Api} from "shared/api"
import {JwtDecoder} from "../lib";
import confirmAlert from "../lib/alert/ConfirmAlert";
import * as process from "process";



const useAxiosInterceptor = ():void => {

    const {AccessToken, setAccessToken} = useUserStore();
    const requestHandler = async (config:InternalAxiosRequestConfig) => {
        // 토큰이 있으면 요청 헤더에 추가한다.
        if (AccessToken) {
            config.headers["AccessToken"] = AccessToken;
            const expireTime:number = Math.floor(new Date(JwtDecoder(AccessToken).exp).getTime());
            const currentTime:number = Math.floor(new Date().getTime()/1000)
            if (currentTime + 1 > expireTime) {
                try {
                    const res = await axios.post(process.env.REACT_APP_SERVER_URL + "/v1/api/sign/refresh-token-cookie", null, {
                    // const res = await axios.post("http://localhost:8080/v1/api/sign/refresh-token-cookie", null, {
                        headers: {
                            AccessToken: AccessToken,
                        },
                        withCredentials:true,
                    });
                    const accessToken: string = res.headers["access-token"];
                    setAccessToken(accessToken);
                    config.headers["AccessToken"] = accessToken;
                } catch (err) {
                    if (axios.isAxiosError(err) && err.response?.status === 401) {
                        try {
                            const res = await confirmAlert("warning", "로그인이 만료되었습니다람쥐.");
                            if (res.isConfirmed) {
                                setAccessToken(null);
                                window.location.href = "/login"
                            }
                        } catch (confirmErr) {
                            console.error("Error during confirmAlert:", confirmErr);
                        }
                    }
                    return Promise.reject(err);
                }
            }
        }
        return config;
    };
    const requestErrorHandler = (error:any) => {
        console.log("요청 전 에러!", error);


        return Promise.reject(error);
    };

    const responseHandler = (response:AxiosResponse) => {
        return response;
    };

    const responseErrorHandler = async(error:any) => {
        if(error.response.data.detailMessage === "접근 권한 없음") {
            try {
                const res = await confirmAlert("warning", "접근 권한이 없습니다.");
                if (res.isConfirmed) window.location.href = "/"
            }catch (confirmErr) {
                console.error("Error during confirmAlert:", confirmErr);
            }
        }else if (error.response.status === 401
            && error.response.data.detailMessage !== "자격 증명에 실패하였습니다."
            && error.response.data.detailMessage !== "자격 증명에 실패하였습니다. 계정이 잠깁니다."
            && error.response.data.detailMessage !== "Login Locked User"
        ) {
            try {
                const res = await confirmAlert("warning", "로그인 해주세요.");
                if (res.isConfirmed) {
                    setAccessToken(null);
                    window.location.href = "/login"
                }
            } catch (confirmErr) {
                console.error("Error during confirmAlert:", confirmErr);
            }

        }
        return Promise.reject(error)
    }

    const requestInterceptor = Api.interceptors.request.use(
        (config:InternalAxiosRequestConfig) =>requestHandler(config),
        (error:AxiosError | Error) =>requestErrorHandler(error)
    );

    const responseInterceptor = Api.interceptors.response.use(
        (response:AxiosResponse) => responseHandler(response),
        (error:AxiosError | Error) => responseErrorHandler(error)
    );

    useEffect(() => {
        return () => {
            Api.interceptors.request.eject(requestInterceptor);
            Api.interceptors.response.eject(responseInterceptor);
        };
    }, [responseInterceptor, requestInterceptor]);
};

export { useAxiosInterceptor, Api };