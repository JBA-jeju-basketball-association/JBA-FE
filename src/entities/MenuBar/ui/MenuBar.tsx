import React from "react"
import Style from'./MenuBar.module.css'
import { Link } from "react-router-dom"
import { menuName } from "../lib/menuName"




export default function MenuBar(){

    return(
        //menuName 변수의 값을 사용하여 메뉴를 생성해줍니다.
        <ul className={Style.Ul}>
         {Object.entries(menuName).map(([category, items]) => (
          <Menu MainMenu={category} subMene={items}></Menu>
         ))}
         <div className={Style.BackGround}/>
        </ul>
    )
}



function Menu({MainMenu,subMene}:{MainMenu:string,subMene:string[]}){
    return(
        //menuName의 키값을 MainMenu로 담아 li에 담고 데이터 array를subMene에 넣어 map하여 생성해줍니다.
           <li className={Style.Li}>
            {/* <Link to={menuLink[MainMenu]}>{MainMenu}</Link> */}
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