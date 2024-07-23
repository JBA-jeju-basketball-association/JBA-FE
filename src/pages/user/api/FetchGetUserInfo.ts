import {Api} from "../../../shared/api";


export default function FetchGetUserInfo() {
    return Api.get("v1/api/user/get/user-info")
}