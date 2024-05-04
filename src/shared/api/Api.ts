import axios, {AxiosInstance} from "axios";
import * as process from "process";

export const Api:AxiosInstance = axios.create({
    // baseURL: `${process.env.BACKEND_SERVER_URL}`, // 배포된 서버 사용시
    baseURL: "http://localhost:8080", // 로컬 서버 사용시
    headers: {
        Accept:"application/json",
    }
})
