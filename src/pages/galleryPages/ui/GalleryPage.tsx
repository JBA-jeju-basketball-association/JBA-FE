import React, { useEffect, useState } from "react";
import { GalleryCardList } from "entities/gallery";
import styles from "./GalleryPage.module.css";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import { RegitUpdateDeleteButton } from "shared/ui/regitUpdateDeleteButton/RegitUpdateDeleteButton";
import { GalleryCardType } from "shared/type/GalleryType";
import { PageTitle } from "shared/ui";
import { useNavigate } from "react-router-dom";
import { JwtDecoder } from "shared/lib";
import { useUserStore } from "shared/model";
import { useGalleryDatas } from "../api/useGalleryDatas";
import {ListErrorRow} from "../../../shared/ui/listErrorRow/ListErrorRow";

export const GalleryPage = () => {
  const [page, setPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();

  const { data: galleryData, refetch } = useGalleryDatas({
    page,
    searchKeyword,
  });

  const galleries: GalleryCardType[] = galleryData?.data.data.galleries ?? [];
  const totalPage: number = galleryData?.data.data.totalPages ?? 0;

  const findTargetPage = () => {
    setPage(1);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [searchKeyword]);


  return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleWrapper}>
            <PageTitle pageName="갤러리"/>
          </div>
          <div className={styles.buttonWrapper}>
            {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
                <RegitUpdateDeleteButton
                    content="등록하기"
                    onClickHandler={() => navigate("galleryupload")}
                />
            ) : (
                <div></div>
            )}
            <SearchBar
                setSearchKeyword={setSearchKeyword}
                handleSearch={() => findTargetPage()}
            />
          </div>
          <GalleryCardList galleries={galleries}/>
          <Pagination totalPages={totalPage} page={page} setPage={setPage}/>
        </div>
      </div>
  );
};
