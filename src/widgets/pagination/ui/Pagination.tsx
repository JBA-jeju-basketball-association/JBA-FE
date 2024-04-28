import React from 'react';
import style from "./Pagination.module.css"

type Props = {
    totalPages:number;
    page:number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const Pagination = ({totalPages, page, setPage}:Props) => {
    const groupSize:number = 5;
    const pageGroup: number = Math.ceil(page / groupSize);
    let lastPage:number;
    let firstPage:number;
    const pageNumbers:number[] = [];

    if (pageGroup * groupSize <= totalPages) {
        lastPage = pageGroup * groupSize
        firstPage = lastPage - (groupSize -1)
    }else {
        lastPage = totalPages
        firstPage = (pageGroup * 5) - 4;
    }
    for (let i:number = firstPage; i <= lastPage; i++) {
        pageNumbers.push(i);
    }

    const handleLeftRightButton = (num:number):void => {
        setPage(page + num)
        window.scrollTo(0, 80);
    }

    const handleSelectPage = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>):void => {
        // @ts-ignore
        const num: number = parseInt(e.target.innerHTML);
        window.scrollTo(0, 80);
        setPage(num);
    }

    return (
        <div className={style.pagination}>
            {page > 1 && <button onClick={():void => handleLeftRightButton(-1)} className={style.leftRightButton}>&lt;</button>}

            {pageNumbers.map((item:number,index:number) => {
                return <button key={index}
                               className={page !== item ? style.pagination__link : style.pagination__link__active}
                               onClick={(e) => handleSelectPage(e)}>{item}</button>;
            })}

            {page < totalPages && <button onClick={():void => handleLeftRightButton(1)} className={style.leftRightButton}>&gt;</button>}
        </div>
    );
};
