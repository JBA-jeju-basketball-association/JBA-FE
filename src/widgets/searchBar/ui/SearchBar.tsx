import React, {useState} from 'react';
import style from "./SearchBar.module.css"
import { FaSearch } from "react-icons/fa";

type Props = {
    searchCategory: string;
    setSearchCategory: React.Dispatch<React.SetStateAction<string>>;
    setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
    handleSearch: any;
}

export const SearchBar = ({searchCategory, setSearchCategory, setSearchKeyword, handleSearch}:Props) => {
    const [dropdownVisibility, setDropdownVisibility] = useState<boolean>(false);


    const handleSearchCategory = (category:string):void => {
        // @ts-ignore
        setSearchCategory(category)
        setDropdownVisibility(false)
    }



    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>):void {
        if (e.key === "Enter") {
            handleSearch()
        }
    }


    return (
        <div className={style.SearchBox}>
            <div>
                <button className={style.selectButton}
                        onClick={() => setDropdownVisibility(!dropdownVisibility)}>{searchCategory} {dropdownVisibility ? "▲" : "▼"}</button>
                {dropdownVisibility &&
                    <ul className={style.liBox}>
                        <li onClick={(e) => handleSearchCategory("전체")}>{searchCategory === "전체" ? "▻" : ""} 전체</li>
                        <li onClick={(e) => handleSearchCategory("제목")}>{searchCategory === "제목" ? "▻" : ""} 제목</li>
                        <li onClick={(e) => handleSearchCategory("내용")}>{searchCategory === "내용" ? "▻" : ""} 내용</li>
                    </ul>
                }
            </div>
            <div className={style.inputArea}>
                <input type={"text"}
                       className={style.searchInput}
                       onKeyDown={(e)=>handleKeyDown(e)}
                       onChange={(e)=>setSearchKeyword(e.target.value)}
                />
                <FaSearch  size={"20"} className={style.searchButton} onClick={()=> handleSearch()}/>
            </div>
        </div>
    );
};
