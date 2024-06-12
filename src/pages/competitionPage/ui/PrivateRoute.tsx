import React from 'react';
import {useUserStore} from "../../../shared/model";
import {JwtDecoder} from "../../../shared/lib";
import {Navigate, Outlet} from "react-router-dom";
import confirmAlert from "../../../shared/lib/ConfirmAlert";


export const PrivateRoute  = () => {
    const {AccessToken} = useUserStore();


    if (AccessToken) {
        const decodedToken:any = JwtDecoder(AccessToken);
        if (decodedToken.role === "ROLE_MASTER") {
            return <Outlet />
        }else {
            confirmAlert("warning", "권한이 없습니다.")
        }
    }else {
        confirmAlert("warning", "로그인이 필요합니다.")
            .then(res => window.location.href = "/login")
    }

    return <Navigate replace to="/"/>;


};
