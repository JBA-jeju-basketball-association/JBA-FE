import React from 'react';
import Style from './logo.module.css';

const Logo = () => {
    return (
        <div className={Style.Logo}>
       <img src='/logo.jpeg' alt=''></img>
       </div>
    );
};

export default Logo;