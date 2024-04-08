import React from "react"
import Menu from "./Menu/Menu"
import Style from'./MenuBar.module.css'
import { menuName } from "../lib/menuName"


export default function MenuBar(){

    return(
        //menuName 변수의 값을 사용하여 메뉴를 생성해줍니다.
        <ul className={Style.Ul}>
         {Object.entries(menuName).map(([category, items]) => (
          <Menu MainMenu={category} subMene={items}></Menu>
         ))}
        </ul>
    )
}