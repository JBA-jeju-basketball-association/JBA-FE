import React from 'react';

export const AdminUser = () => {
    return (
        <div style={{width:"100%", height:"1000px", display:"flex", flexDirection:"column", alignItems:"center"}}>
            <div style={{backgroundColor: "black", width: "90%", height:"200px", color:"white", fontSize: "40px"}}> 필터영역</div>
            <div style={{backgroundColor: "black", width: "90%", height:"700px", color:"white", marginTop:"50px", fontSize: "40px"}}>목록 영역</div>
        </div>
    );
};
