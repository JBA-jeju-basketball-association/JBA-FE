import {NormalApi} from "../../../shared/api/NormalApi";


export default function fetchCompetitionInfo(id:string|undefined) {
    return NormalApi.get(`/v1/api/competition/detail/${id}`)
}