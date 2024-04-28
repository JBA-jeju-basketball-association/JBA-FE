import axios, {AxiosResponse} from "axios";



export default function fetchGetCompetitionList (statusFocused:string, year:string, page:number, pageSize:number):Promise<AxiosResponse<any,any>>{
    return axios.get(`http://localhost:8080/v1/api/competition/competition?status=${statusFocused}&year=${year}&page=${page-1}&size=${pageSize}`)
}