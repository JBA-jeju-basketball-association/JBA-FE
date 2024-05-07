import {NormalApi} from "../../../shared/api/NormalApi";


export default function fetchGetCompetitionResult(id:string | undefined) {
    if (id) {
    return NormalApi.get(`/v1/api/competition/result?id=${id}`)
    }
}