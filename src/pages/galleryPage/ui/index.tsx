import React, { useState, useEffect } from "react";
import GalleryCardList from "entity/galleryCardList/ui";
import styles from "./galleryPage.module.css";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { Link } from "react-router-dom";
import { GalleryCardType } from "shared/type/Gallery";

const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("제목");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filteredGalleries, setFilteredGalleries] = useState<GalleryCardType[]>(
    []
  );

  // 페이지 전체 조회하는 쿼리
  const { data: galleryData, refetch } = useQuery({
    queryKey: ["galleries", page],
    queryFn: () =>
      Api.get(`/v1/api/gallery`, {
        params: {
          page: page - 1,
          size: 6,
          official: true,
        },
      }),
  });

  const galleries: GalleryCardType[] = galleryData?.data.data.galleries ?? [];
  const totalPage: number = galleryData?.data.data.totalPages ?? 0;

  // 검색 결과 필터링 및 페이지 이동
  useEffect(() => {
    if (!galleryData) return;
    const filterGalleries = () => {
      return galleries.filter((gallery) =>
        //galleries 데이터를 필터해서
        searchCategory === "제목" || searchCategory === "전체"
          ? //제목이나 전체로 검색했을 때 true면 타이틀을 포함하는 갤러리만 반환
            gallery.title?.includes(searchKeyword) ?? false
          : true
      );
    };
    setFilteredGalleries(filterGalleries());

    //검색어가 바뀌면 필터링된 갤러리를 다시 세팅
  }, [galleryData, searchCategory, searchKeyword]);

  // 검색 결과 페이지로 이동하는 함수 호출
  const findTargetPage = () => {
    Api.get(`/v1/api/gallery`, {
      params: {
        page: 0,
        size: totalPage * 6,
        official: true,
      },
    }).then((res) => {
      const allGalleries = res.data.data.galleries;
      const foundIndex = allGalleries.findIndex((gallery: GalleryCardType) =>
        gallery.title?.includes(searchKeyword)
      );
      const targetPageNumber =
        foundIndex !== -1 ? Math.floor(foundIndex / 6) + 1 : 1;
      setPage(targetPageNumber);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.GalleryPageHeader}>
        <h1>갤러리</h1>
        <Link to={"/galleryupload"}>
          <RegitUpdateDeleteButton content="등록하기" />
        </Link>
      </div>
      <GalleryCardList galleries={filteredGalleries} />
      <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      <SearchBar
        searchCategory={searchCategory}
        setSearchCategory={setSearchCategory}
        setSearchKeyword={setSearchKeyword}
        handleSearch={() => findTargetPage()}
      />
    </div>
  );
};

export default GalleryPage;
