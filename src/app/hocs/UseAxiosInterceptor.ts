import axios, {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import useUserStore from "./UserStore";
import Api from "app/hocs/Api"
import JwtDecoder from "./JwtDecoder";



const useAxiosInterceptor = ():void => {

    const navigate = useNavigate();
    const {AccessToken, RefreshToken, setAccessToken, setRefreshToken} = useUserStore();

    const requestHandler = async (config:InternalAxiosRequestConfig) => {
        // 토큰이 있으면 요청 헤더에 추가한다.
        if (AccessToken) {
            config.headers["AccessToken"] = AccessToken;
            const expireTime:number = Math.floor(new Date(JwtDecoder(AccessToken).exp).getTime());
            const currentTime:number = Math.floor(new Date().getTime()/1000)
            if (currentTime + 1 > expireTime) {
                await axios.post("http://localhost:8080/v1/api/sign/refresh-token", null, {
                    headers: {
                        AccessToken: AccessToken,
                        RefreshToken: RefreshToken
                    }
                })
                    .then(res => {
                        const accessToken: string = res.headers["access-token"];
                        const refreshToken: string = res.headers["refresh-token"];

                        setAccessToken(accessToken);
                        setRefreshToken(refreshToken);
                        config.headers["AccessToken"] = accessToken;
                    }).catch(err => {
                        if (err.response.status === 401) {
                            setAccessToken(null);
                            setRefreshToken(null);
                            alert("로그인이 만료되었습니다.");
                            window.location.href = "/login";
                        }
                    })
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
            alert("접근 권한이 없습니다.")
            window.location.href = "/main"
        }else if (error.response.status === 401
            && error.response.data.detailMessage !== "자격 증명에 실패하였습니다."
            && error.response.data.detailMessage !== "자격 증명에 실패하였습니다. 계정이 잠깁니다."
            && error.response.data.detailMessage !== "Login Locked User"
        ) {
            setAccessToken(null);
            setRefreshToken(null);
            alert("로그인 해주세요.");
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