import React from 'react';
import {useUserStore} from "../../../shared/model";
import {JwtDecoder} from "../../../shared/lib";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = () => {
    const {AccessToken} = useUserStore()
    if (AccessToken) {
        if (JwtDecoder(AccessToken).role === "ROLE_MASTER") {
            return <Outlet />
        }else {
            alert("권한이 없습니다.")
        }
    }else {
        alert("권한이 없습니다.")

    }

    return <Navigate replace to="/main"/>;


};
