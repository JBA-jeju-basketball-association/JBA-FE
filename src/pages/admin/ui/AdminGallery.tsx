import React, { useState } from "react";
import styles from "./AdminGallery.module.css";
import { AdminSearchForm } from "features/admin/";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminListData } from "features/admin/";
import {
  galleryListLength,
  galleryLabel,
  galleryCategories,
} from "../adminUtils/adminGalleryTitle";

export const AdminGallery = () => {
  const [page, setPage] = useState(1);
  const totalPage = 10;

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm categories={galleryCategories} label={galleryLabel} />
      </div>
      <div className={styles.listWrapper}>
        <p className={styles.listLength}>
          총 n건 <CategoryList categories={galleryListLength} /> 개씩 보기
        </p>
        <AdminListData />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
