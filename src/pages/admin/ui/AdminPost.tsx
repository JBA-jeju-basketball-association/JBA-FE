import React, { useState, useEffect } from "react";
import styles from "./AdminPost.module.css";
import { AdminSearchForm } from "features/admin/";
import {
  postListLength,
  postCategories,
  postLabel,
  postListTitles,
} from "../adminUtils/adminPostTitle";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminPostListData } from "features/admin/";
import { useAdminPostDatas } from "../api/useAdminPostDatas";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";

export const AdminPost = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(postListLength[0]);
  const navigate = useNavigate();

  const { data: adminPostDatas, refetch } = useAdminPostDatas({
    page,
    postListLength: selectedCategory.list,
  });

  const adminPostData = adminPostDatas?.data.data ?? [];
  const totalPage: number = adminPostDatas?.data.data.totalPages ?? 0;

  const handleNavigateToUploadPage = () => {
    navigate("/post/notice/add");
  };
  console.log(adminPostData)

  useEffect(() => {
    refetch();
  }, [page, selectedCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categories={gallerySearchCriteria} label={galleryLabel} /> */}
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          <div className={styles.listLength}>
            총 {adminPostData.totalPosts}건
            <div className={styles.CategoryListWrapper}>
              <CategoryList
                categories={postListLength}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            개씩 보기
          </div>
          <div>
            <Button onClick={handleNavigateToUploadPage}>게시물 등록</Button>
          </div>
        </div>
        <AdminPostListData
          titles={postListTitles}
          lists={adminPostData.posts}
        />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
