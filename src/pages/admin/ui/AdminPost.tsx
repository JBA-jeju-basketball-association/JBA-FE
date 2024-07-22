import React, { useState } from "react";
import styles from "./AdminPost.module.css";
import { AdminSearchForm } from "features/admin/";
import {
  postListLength,
  postListTitles,
  postLabel,
  firPostcategory,
  secPostcategory,
  postCsv,
} from "../adminUtils/adminPostTitle";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminPostListData } from "features/admin/";
import { useAdminPostDatas, useAdminPostCsv } from "../api/useAdminPostDatas";
import Button from "shared/ui/button";
import { useAdminPostStore } from "shared/model/stores/AdminPostStore";
import { CSVLink } from "react-csv";
import { useFlattenData } from "shared/hook/useFlattenData";
import confirmAlert from "shared/lib/ConfirmAlert";

export const AdminPost = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const flattenDatas = useFlattenData();

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

  const { data: postCsvDatas } = useAdminPostCsv(isEnabled);
  //csv데이터 size100000

  const adminPostData = adminPostDatas?.data.data ?? [];
  const totalPage: number = adminPostDatas?.data.data.totalPages ?? 0;
  const csvData = postCsvDatas?.data.data.posts ?? [];

  const uploadPage = (categroy: string) => {
    window.open(`/post/${categroy}/add`);
  };

  const handleSearch = () => {
    if (adminPostData.totalPosts === 0) {
      confirmAlert("info", "조회 가능한 데이터가 없습니다.");
      return;
    }
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

  // 평탄화된 데이터
  const postCsvData = flattenDatas(csvData);

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
              onClick={() => uploadPage("notice")}
            >
              공지 등록
            </Button>
            <Button
              className={styles.uploadBtn}
              onClick={() => uploadPage("news")}
            >
              news 등록
            </Button>
            <Button
              className={styles.uploadBtn}
              onClick={() => uploadPage("library")}
            >
              자료실 등록
            </Button>
            {adminPostData.posts && (
              <CSVLink
                headers={postCsv}
                data={postCsvData}
                filename="post.csv"
                className={styles.csvBtn}
              >
                엑셀 다운로드
              </CSVLink>
            )}
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
