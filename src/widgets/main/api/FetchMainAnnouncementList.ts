import {NormalApi} from "../../../shared/api";

export default function FetchMainAnnouncementList() {
        return NormalApi.get("/v1/api/post/notice?size=27&page=0");
}