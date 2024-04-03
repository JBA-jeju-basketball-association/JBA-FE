import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {api} from "./hocs/api";

const Test = () => {

    const fetchUserName = () => {
        return api.get("/test") // url 변경해서 error 테스트 가능
    }

    const {data, isLoading, isError, error} = useQuery({
        queryKey: ["test"],
        queryFn: fetchUserName,
        select: (data) => data.data,
        retry: false, // 요청 실패 시 retry 개수
        gcTime: 5000, // 캐시 저장 시간 : 5초
    })

    console.log("data", data)

    if (isLoading) {
        return <h1>isLoading.....</h1>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <div style={{width:300, height:300, backgroundColor:"lightgray", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <h1>{data}</h1>
        </div>
    );
};

export default Test;