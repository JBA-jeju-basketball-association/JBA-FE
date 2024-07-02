import React, { useState, useEffect } from "react";
import styles from "./AdminPost.module.css";
import { AdminPostSearchForm } from "features/admin/";
import {
  postListLength,
  postListTitles,
  postLabel,
} from "../adminUtils/adminPostTitle";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminPostListData } from "features/admin/";
import { useAdminPostDatas } from "../api/useAdminPostDatas";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import { useAdminPostStore } from "shared/model/stores/AdminPostStore";

export const AdminPost = () => {
  const {
    page,
    setPage,
    selectedCategory,
    selectedfirstCategory,
    searchKeyword,
    selectedSecondCategory,
    startDate,
    endDate,
    setSelectedCategory,
  } = useAdminPostStore();

  const navigate = useNavigate();

  const { data: adminPostDatas, refetch } = useAdminPostDatas({
    page,
    postListLength: selectedCategory.list,
    firstCategory: selectedfirstCategory.list,
    searchKeyword,
    secondCategory: selectedSecondCategory.list,
    startDate,
    endDate,
  });

  const adminPostData = adminPostDatas?.data.data ?? [];
  const totalPage: number = adminPostDatas?.data.data.totalPages ?? 0;

  const handleNavigateToUploadPage = () => {
    navigate("/post/notice/add");
  };

  useEffect(() => {
    refetch();
  }, [
    page,
    selectedCategory,
    selectedfirstCategory,
    searchKeyword,
    selectedSecondCategory,
  ]);

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminPostSearchForm refetch={refetch} />
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
            <Button
              className={styles.uploadBtn}
              onClick={handleNavigateToUploadPage}
            >
              게시물 등록
            </Button>
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

//현재 카테고리 선택으로 렌더링됨 -> 고치기
