import React, { useEffect, useState } from "react";
import styles from "./AdminGallery.module.css";
import { AdminSearchForm } from "features/admin/";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminGalleryListData } from "features/admin/";
import {
  galleryListLength,
  galleryLabel,
  galleryCategories,
  galleryListTitles,
} from "../adminUtils/adminGalleryTitle";
import { useAdminGalleryDatas } from "../api/useAdminGalleryDatas";

export const AdminGallery = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    galleryListLength[0]
  );

  const { data: adminGalleryDatas, refetch } = useAdminGalleryDatas({
    page,
    galleryListLength: selectedCategory.list,
  });

  const adminGalleryData = adminGalleryDatas?.data.data ?? [];
  const totalPage: number = adminGalleryDatas?.data.data.totalPages ?? 0;

  useEffect(() => {
    refetch();
  }, [page, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categories={galleryCategories} label={galleryLabel} /> */}
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLength}>
          총 {adminGalleryData.totalGalleries}건
          <div className={styles.CategoryListWrapper}>
            <CategoryList
              categories={galleryListLength}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          개씩 보기
        </div>
        <AdminGalleryListData
          titles={galleryListTitles}
          lists={adminGalleryData.galleries}
        />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
