import axios, {AxiosInstance} from "axios";




export const api:AxiosInstance = axios.create({
    // baseURL: 'http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080', // 배포된 서버 사용시
    baseURL: "http://localhost:8080", // 로컬 서버 사용시
    headers: {
        Accept:"application/json",

    }
})


// 요청 인터셉터 추가하기
api.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    // console.log("요청 전",config)
    const AccessToken:string | null = localStorage.getItem("AccessToken");
    const RefreshToken:string | null = localStorage.getItem("RefreshToken");

    // 토큰이 있으면 요청 헤더에 추가한다.
    if (AccessToken) {
        config.headers["AccessToken"] = AccessToken;
    }
    // Refresh 토큰을 보낼 경우 사용하고자 하는 커스텀 인증 헤더를 사용하면 된다.
    if (RefreshToken) {
        config.headers["RefreshToken"] = RefreshToken;
    }
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    console.log("요청 전 error",error)
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
api.interceptors.response.use(function (response) {

    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
}, function async(error) {


    // 토튼 만료 시 accessToken 재발급
    if (error.response.data.detailMessage === "만료된 토큰") {
        const originalRequest = error.config;
        axios.post("http://localhost:8080/v1/api/sign/refresh-token", null, {
            headers: {
                AccessToken: localStorage.getItem("AccessToken"),
                RefreshToken: localStorage.getItem("RefreshToken")
            }
        }).then(res => {
            if (res.status === 200) {
                const accessToken:string = res.headers["access-token"];
                const refreshToken:string = res.headers["refresh-token"];

                localStorage.setItem("RefreshToken", refreshToken)
                localStorage.setItem("AccessToken", accessToken)

                originalRequest.headers["AccessToken"] = accessToken;
                return axios(originalRequest);
            }
        }).catch(err => {
            if (err.response.status === 401) {
                console.log(err.response.data)
                localStorage.removeItem("AccessToken");
                localStorage.removeItem("RefreshToken");
                alert("로그인이 만료되었습니다.")
                window.location.href = "/login"
            }
        })
    }else if(error.response.data.detailMessage === "접근 권한 없음") {
        alert("접근 권한이 없습니다.")
        window.location.href = "/"
    }else if (error.response.status === 401
        && error.response.data.detailMessage !== "자격 증명에 실패하였습니다."
        && error.response.data.detailMessage !== "자격 증명에 실패하였습니다. 계정이 잠깁니다."
        && error.response.data.detailMessage !== "Login Locked User"
    ) {
        localStorage.removeItem("AccessToken");
        localStorage.removeItem("RefreshToken");
        alert("로그인 해주세요.");
    }

    return Promise.reject(error);
});

