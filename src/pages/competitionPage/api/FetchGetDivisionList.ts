import {NormalApi} from "../../../shared/api";


export default function FetchGetDivisionList() {
    return NormalApi.get("/v1/api/competition/find-division-list")
}