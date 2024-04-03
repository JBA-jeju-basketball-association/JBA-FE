import React from 'react';
import style from "./PageTitle.module.css"

type Props = {
    pageName: string;
}
const PageTitle = ({pageName} : Props) => {
    return (
        <h1 className={style.page_title}>
            {pageName}
        </h1>
    );
};

export default PageTitle;