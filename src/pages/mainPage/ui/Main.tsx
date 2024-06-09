import React from 'react';
import {Banner, CompetitionArea} from "../../../widgets/main";
import style from "./Main.module.css"


const Main = () => {


    return (
        <div className={style.Main}>
            {/*<div style={{width:"100%", color:"white", backgroundColor:"black", height:"830px"}}>banner</div>*/}
            <Banner />
            <CompetitionArea />


        </div>

    );
};

export default Main;