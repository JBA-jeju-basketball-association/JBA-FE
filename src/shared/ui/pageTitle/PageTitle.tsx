import React from 'react';
import style from "./PageTitle.module.css"

type Props = {
    pageName: string;
}
export const PageTitle = ({pageName} : Props) => {
    return (
        <h1 className={style.pageTitle}>
            {pageName}
        </h1>
    );
};
