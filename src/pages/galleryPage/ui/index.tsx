import React, { useState, useEffect } from "react";
import GalleryCardList from "entity/galleryCardList/ui";
import styles from "./galleryPage.module.css";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

export type GalleryCardType = {
  galleryId?: number;
  title?: string;
  fileName?: string;
  imgUrl?: string;
};

const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("제목");
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    setPage(1);
    refetch();
  };

  const { data: galleryData, refetch } = useQuery({
    queryKey: ["galleries", page, searchCategory, searchKeyword],
    queryFn: () =>
      Api.get(`/v1/api/gallery`, {
        params: {
          page: page - 1,
          size: 6,
          official: true,
          searchCategory,
          searchKeyword,
        },
      }),
  });
  const galleries: GalleryCardType[] = galleryData?.data.data.galleries ?? [];
  const totalPage: number = galleryData?.data.data.totalPages ?? 0;

  return (
    <div className={styles.container}>
      <h1>갤러리</h1>
      <GalleryCardList galleries={galleries} />
      <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      <SearchBar
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        setSearchKeyword={setSearchKeyword}
        handleSearch={handleSearch}
      />
    </div>
  );
};

export default GalleryPage;
