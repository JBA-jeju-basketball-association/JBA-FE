import axios, { AxiosInstance } from "axios";

export const NormalApi: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL, // 배포된 서버 사용시
  // baseURL: "http://localhost:8080", // 로컬 서버 사용시
  headers: {
    Accept: "application/json",
  },
  withCredentials:true
});