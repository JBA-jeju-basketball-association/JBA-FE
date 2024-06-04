import {NormalApi} from "../../../shared/api";
import {AxiosResponse} from "axios";


export default function fetchCompetitionYearList():Promise<AxiosResponse<any,any>> {
    return NormalApi.get("/v1/api/competition/find-year-list")
}