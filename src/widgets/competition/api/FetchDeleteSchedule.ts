import {Api} from "../../../shared/api";


export default function FetchDeleteSchedule(id:string) {
    return Api.delete(`/v1/api/competition/delete/schedule/${id}`, {})

}