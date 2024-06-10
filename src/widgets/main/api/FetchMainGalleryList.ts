import {NormalApi} from "../../../shared/api";

export default function FetchMainGalleryList() {
        return NormalApi.get("/v1/api/gallery?official=false&size=5");
}