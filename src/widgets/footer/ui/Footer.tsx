import React  from "react";
import Style from './Footer.module.css'



export function Footer(){

return(
    <div className={Style.Footer} >
        <div className={Style.Container}  >
            <div  className={Style.Box}>
                <div  className={Style.Main}>제주특별자치도농구협회</div>
                <div className={Style.Sub}>JEJU BASKETBALL ASSOCIATION</div>
            </div>
            <div  className={Style.Box}>
              <div>Address : 제주특별자치도 제주시 서광로2길 24 제주특별자치도 체육회관 내</div>
              <div  className={Style.Info}>
                  <div>Email : jejubasketball@naver.com </div>
                  <div>/ TEL : 064-000-0000</div>
                  <div>/ FAX : 064-000-0000</div>
              </div>
            </div>
        </div>
    </div>
    )
}