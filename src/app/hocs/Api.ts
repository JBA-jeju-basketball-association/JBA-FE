import axios, {AxiosInstance} from "axios";

const Api:AxiosInstance = axios.create({
    baseURL: 'http://ec2-43-201-38-210.ap-northeast-2.compute.amazonaws.com:8080', // 배포된 서버 사용시
    // baseURL: "http://localhost:8080", // 로컬 서버 사용시
    headers: {
        Accept:"application/json",
    }
})

export default Api;