import React from 'react';
import {RingLoader} from "react-spinners";

export const LoadingSpinner = () => {
    return (
        <div style={{width:"100%", height:"50vh", display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"30vh"}}>
            <RingLoader color="#D8A646" size={150}/>
        </div>
    );
};
