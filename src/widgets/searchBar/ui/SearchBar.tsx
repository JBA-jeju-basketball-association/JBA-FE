import React, { useState } from "react";
import style from "./SearchBar.module.css";
import { FaSearch } from "react-icons/fa";

type Props = {
  searchKeyword?: string;
  setSearchKeyword: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
};

export const SearchBar = ({
  searchKeyword,
  setSearchKeyword,
  handleSearch,
}: Props) => {
  const [typeingTimeOut, setTypeingTimeOut] = useState<NodeJS.Timeout | null>(
    null
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>): void {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  const handleSearchDebounce = (value: string) => {
    if (typeingTimeOut) {
      clearTimeout(typeingTimeOut);
    }
    setTypeingTimeOut(
      setTimeout(() => {
        setSearchKeyword(value);
        // handleSearch();
      }, 500)
    );
  };

  return (
    <div className={style.SearchBox}>
      <input
        type={"text"}
        className={style.searchInput}
        onKeyDown={(e) => handleKeyDown(e)}
        // onChange={(e) => handleSearchDebounce(e.target.value)}
        onChange={(e) => setSearchKeyword(e.target.value)}
        placeholder={"검색"}
        maxLength={20}
        minLength={2}
        value={searchKeyword}
      />
      <FaSearch
        size={"20"}
        className={style.searchButton}
        onClick={() => handleSearch()}
        color={"#8E8E8E"}
      />
    </div>
  );
};
