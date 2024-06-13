import React, { useState } from "react";
import { GalleryCardList } from "entities/gallery";
import styles from "./GalleryPage.module.css";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import { useQuery } from "@tanstack/react-query";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { GalleryCardType } from "shared/type/GalleryType";
import { PageTitle } from "shared/ui";
import { NormalApi } from "shared/api";
import { useNavigate } from "react-router-dom";
import { JwtDecoder } from "shared/lib";
import { useUserStore } from "shared/model";

export const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const [searchCategory, setSearchCategory] = useState("제목");
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();

  // 페이지 전체 조회하는 쿼리
  const { data: galleryData, refetch } = useQuery({
    queryKey: ["galleries", page],
    queryFn: () =>
      NormalApi.get(`/v1/api/gallery`, {
        params: {
          page: page - 1,
          size: 9,
          official: false,
        },
      }),
  });

  const galleries: GalleryCardType[] = galleryData?.data.data.galleries ?? [];
  const totalPage: number = galleryData?.data.data.totalPages ?? 0;

  const findTargetPage = () => {
    console.log("findTargetPage");
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <PageTitle pageName="갤러리" />
        </div>
        <div className={styles.buttonWrapper}>
          {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
            <RegitUpdateDeleteButton
              content="등록하기"
              onClickHandler={() => navigate("galleryupload")}
            />
          ) : (
            ""
          )}
          <SearchBar
            searchCategory={searchCategory}
            setSearchCategory={setSearchCategory}
            setSearchKeyword={setSearchKeyword}
            handleSearch={() => findTargetPage()}
          />
        </div>
        <GalleryCardList galleries={galleries} />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
