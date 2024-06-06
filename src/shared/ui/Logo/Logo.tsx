import React from 'react';
import { Link } from "react-router-dom"
import Style from './logo.module.css';


const Logo = () => {
    return (
        <div className={Style.Logo}>
       <Link to={"./"}>
       <img src='/logo.jpeg' alt=''/>
       </Link>
       </div>
    );
};

export default Logo;