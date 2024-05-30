import React, { useState, useEffect } from "react";
import GalleryCardList from "entity/galleryCardList/ui";
import styles from "./galleryPage.module.css";
import { Pagination } from "widgets/pagination";
import { SearchBar } from "widgets/searchBar";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

type GalleryCardType = {
  galleryId: number;
  title: string;
  fileName: string;
  imgUrl: string;
};

const GalleryPage = () => {
  const [page, setPages] = useState(1);

  const { data: galleryData } = useQuery({
    queryKey: ["galleries", page],
    queryFn: () =>
      axios.get(
        `http://ec2-43-200-4-149.ap-northeast-2.compute.amazonaws.com:8080/v1/api/gallery?page=${page - 1}&size=6&official=true`
      ),
  });
  const galleries: GalleryCardType = galleryData?.data.data.galleries ?? [];
  const totalPage: number = galleryData?.data.data.totalPages ?? 0;

  return (
    <div className={styles.container}>
      <h1>갤러리</h1>
      <GalleryCardList galleries={galleries} />
      <Pagination totalPages={totalPage} page={page} setPage={setPages} />
      {/* <SearchBar /> */}
    </div>
  );
};

export default GalleryPage;
