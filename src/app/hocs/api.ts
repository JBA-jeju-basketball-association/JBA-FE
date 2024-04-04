import axios, {AxiosInstance} from "axios";


export const api:AxiosInstance = axios.create({
    // baseURL: 'http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080', // 배포된 서버 사용시
    baseURL: "http://localhost:8080", // 로컬 서버 사용시
    headers: {
        // Accept:"application/json"
    }
})

// 요청 인터셉터 추가하기
axios.interceptors.request.use(function (config) {
    // 요청이 전달되기 전에 작업 수행
    return config;
}, function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
});

// 응답 인터셉터 추가하기
axios.interceptors.response.use(function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
}, function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
});