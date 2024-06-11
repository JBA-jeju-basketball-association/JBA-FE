import {NormalApi} from "../../../shared/api";

export default function FetchMainCompetitionList() {
        return NormalApi.get(`/v1/api/main/competition`);
}