import {NormalApi} from "../../../shared/api";


export default function FetchGetCompetitionResult(id:string | undefined) {
    if (id) {
    return NormalApi.get(`/v1/api/competition/result/${id}`)
    }
}