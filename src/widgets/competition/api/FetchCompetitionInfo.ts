import {NormalApi} from "../../../shared/api";


export default function fetchCompetitionInfo(id:string|undefined) {
    if (id) {
        return NormalApi.get(`/v1/api/competition/detail/${id}`);
    }
}