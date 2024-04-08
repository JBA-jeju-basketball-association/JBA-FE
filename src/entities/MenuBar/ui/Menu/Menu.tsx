import React from "react"
import { Link } from "react-router-dom"
// import { menuLink } from "entities/MenuBar/lib/menrLink"
import Style from './Menu.module.css'

export default function Menu({MainMenu,subMene}:{MainMenu:string,subMene:string[]}){
    return(
        //menuName의 키값을 MainMenu로 담아 li에 담고 데이터 array를subMene에 넣어 map하여 생성해줍니다.
           <li className={Style.Li}>
            {/* <Link to={menuLink[MainMenu]}>{MainMenu}</Link> */}
             <Link to={"main"}>{MainMenu}</Link>
            <ul className={Style.Ul}>
                {subMene.map((mene)=>{
                    return(
                        // <li><Link to={menuLink[mene]}>{mene}</Link></li>)
                       <li><Link to={"main"}>{mene}</Link></li>)

                })}
            </ul>
           </li>
    )
}