import React, { useState, useEffect } from "react";
import styles from "./AdminPost.module.css";
import { AdminSearchForm } from "features/admin/";
import {
  postListLength,
  postListTitles,
  postLabel,
  firPostcategory,
  secPostcategory,
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
    setSelectedfirstCategory,
    setSearchKeyword,
    setSelectedSecondCategory,
    setStartDate,
    setEndDate,
  } = useAdminPostStore();

  const [isEnabled, setIsEnabled] = useState(false);
  const navigate = useNavigate();
  const { data: adminPostDatas, refetch } = useAdminPostDatas(
    {
      page,
      postListLength: selectedCategory.list,
      firstCategory: selectedfirstCategory.list,
      searchKeyword,
      secondCategory: selectedSecondCategory.list,
      startDate,
      endDate,
    },
    isEnabled
  );

  const adminPostData = adminPostDatas?.data.data ?? [];
  const totalPage: number = adminPostDatas?.data.data.totalPages ?? 0;

  const handleNavigateToUploadPage = () => {
    window.open("/post/notice/add", "_blank");
  };

  const handleSearch = () => {
    setIsEnabled(true);
    refetch();
  };

  const handleReset = () => {
    setSelectedfirstCategory(firPostcategory[0]);
    setSelectedSecondCategory(secPostcategory[0]);
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setIsEnabled(false);
  };

  const downloadExcel = () => {
    console.log("excel download");
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm
          label={postLabel}
          firstCategoryOptions={firPostcategory}
          secondCategoryOptions={secPostcategory}
          selectedfirstCategory={selectedfirstCategory}
          setSelectedfirstCategory={setSelectedfirstCategory}
          selectedSecondCategory={selectedSecondCategory}
          setSelectedSecondCategory={setSelectedSecondCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          handleSearch={handleSearch}
          handleReset={handleReset}
        />
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          <div className={styles.listLength}>
            총 {adminPostData.totalPosts || "0"}건
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
            <Button className={styles.uploadBtn} onClick={downloadExcel}>
              엑셀 다운로드
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
//formprovider 바꾸기
