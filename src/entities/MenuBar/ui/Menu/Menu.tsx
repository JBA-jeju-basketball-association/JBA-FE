import React from "react"
import { Link } from "react-router-dom"
// import { menuLink } from "entities/MenuBar/lib/menrLink"
import Style from './Menu.module.css'

export default function Menu({MainMenu,subMene}:{MainMenu:string,subMene:string[]}){
    return(
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