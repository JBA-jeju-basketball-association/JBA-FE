import React, { useState } from "react"
import Style from'./MenuBar.module.css'
import classNames from 'classnames';
import { Link } from "react-router-dom"
import { menuName } from "../lib/menuName"
import Logo from "shared/ui/Logo/Logo";
import { menuLink } from "../lib/menrLink";




export default function MenuBar(){
    const [focuse, setFocuse]=useState(false)
    return(
        //menuName 변수의 값을 사용하여 메뉴를 생성해줍니다.
        <div className={Style.MenuBar}>
            <Logo></Logo>
            <div className={Style.MenuBar_Inner} >
                <ul className={Style.Ul}
                    onMouseEnter={() => { setFocuse(true)}}
                    onMouseLeave={() => setFocuse(false)}>
                {Object.entries(menuName).map(([category, items],i,array) => (
                <Menu MainMenu={category} subMene={items} iscenter={isCenter(array.length,i)} focuse={focuse} key={i}></Menu>
                ))}
                </ul>
            </div>
            <div className={`${Style.BackGround} ${focuse ? Style.On : Style.Off}`}
             onMouseEnter={() => { setFocuse(true)}}
            onMouseLeave={() => setFocuse(false)}/>
        </div>
    )
}



function Menu({MainMenu,subMene,iscenter,focuse}:{MainMenu:string,subMene:string[],iscenter:boolean,focuse:boolean}){

    const liClass = classNames(Style.Li, {
        [Style.iscenter]: iscenter,
    });
    return(
        
        //menuName의 키값을 MainMenu로 담아 li에 담고 데이터 array를subMene에 넣어 map하여 생성해줍니다.
           <li className={liClass} >

            <span>{MainMenu}</span>
            <ul className={`${Style.SubMenu} ${focuse ? Style.OnSubMenu : Style.OffSubMene}`}
            >
                {subMene.map((mene:string, index:number)=>{
                    return(
                    <li key={index}><Link to={menuLink[mene]}>{mene}</Link></li>)

                })}
            </ul>
           </li>
    )
}

function isCenter(arrayLength:number,num:number){
    if(arrayLength%2===0){
        return Math.trunc(arrayLength / 2) === num
    }else if(arrayLength%2===1){
        return Math.trunc(arrayLength / 2) + 1 === num
    }else{return false}
}

