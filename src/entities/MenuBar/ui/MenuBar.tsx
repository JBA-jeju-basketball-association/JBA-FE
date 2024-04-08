import React from "react"
import Menu from "./Menu/Menu"
import Style from'./MenuBar.module.css'
import { menuName } from "../lib/menuName"


export default function MenuBar(){

    return(
        <ul className={Style.Ul}>
         {Object.entries(menuName).map(([category, items]) => (
          <Menu MainMenu={category} subMene={items}></Menu>
         ))}
        </ul>
    )
}