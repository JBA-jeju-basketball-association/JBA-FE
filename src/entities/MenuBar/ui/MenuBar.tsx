import React, { useState } from "react"
import Style from'./MenuBar.module.css'
import classNames from 'classnames';
import { Link } from "react-router-dom"
import { menuName } from "../lib/menuName"
import Logo from "shared/ui/Logo/Logo";




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
                <Menu MainMenu={category} subMene={items} iscenter={iscenter(array.length,i)}></Menu>
                ))}
                </ul>
            </div>
            <div className={`${Style.BackGround} ${focuse? Style.On:Style.Off}`}/>
        </div>
    )
}



function Menu({MainMenu,subMene,iscenter}:{MainMenu:string,subMene:string[],iscenter:boolean}){

    const liClass = classNames(Style.Li, {
        [Style.iscenter]: iscenter,
    });
    return(
        
        //menuName의 키값을 MainMenu로 담아 li에 담고 데이터 array를subMene에 넣어 map하여 생성해줍니다.
           <li className={liClass} >

            {/* <Link to={menuLink[MainMenu]}>{MainMenu}</Link> 
            link 생성될 시 해당 코드 활성화 후 아래 코드 삭제*/}
             <Link to={"main"}>{MainMenu}</Link>
            <ul className={Style.SubMenu}>
                {subMene.map((mene)=>{
                    return(
                        // <li><Link to={menuLink[mene]}>{mene}</Link></li>)
                       <li><Link to={"main"}>{mene}</Link></li>)

                })}
            </ul>
           </li>
    )
}

function iscenter(arrayLength:number,num:number){
    if(arrayLength%2===0){
        return Math.trunc(arrayLength/2)===num?true:false
    }else if(arrayLength%2===1){
        return Math.trunc(arrayLength/2)+1 ===num?true:false
    }else{return false}
}

