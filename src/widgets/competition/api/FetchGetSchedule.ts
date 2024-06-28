import {NormalApi} from "../../../shared/api";


export default function FetchGetSchedule(id:string | undefined) {
    if (id) {
        return NormalApi.get(`/v1/api/competition/schedule/${id}`)

    }
}