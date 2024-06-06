import {Api} from "../../../shared/api";


export default function fetchGetCompetitionResultWithTitle(id:string | undefined) {
    if (id) {
        return Api.get(`/v1/api/competition/result-with-title?id=${id}`)

    }
}