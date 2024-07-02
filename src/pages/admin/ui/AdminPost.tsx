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

export const AdminPost = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(postListLength[0]);
  const [selectedfirstCategory, setSelectedfirstCategory] = useState(
    firPostcategory[0]
  );
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(
    secPostcategory[0]
  );
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const navigate = useNavigate();

  const { data: adminPostDatas, refetch } = useAdminPostDatas({
    page,
    postListLength: selectedCategory.list,
    firstCategory: selectedfirstCategory.list,
    searchKeyword,
    secondCategory: selectedSecondCategory.list,
    startDate,
    endDate
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
        <AdminSearchForm
          label={postLabel}
          selectedfirstCategory={selectedfirstCategory}
          setSelectedfirstCategory={setSelectedfirstCategory}
          selectedSecondCategory={selectedSecondCategory}
          setSelectedSecondCategory={setSelectedSecondCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          refetch={refetch}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
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

//state를 기본값으로 설정하지 말고 검색을 해야 나오도록
//keyword 값이 있을시 검색된 데이터들을 반환하고 없을시 전체 목록 반환
//검색 기준 (기본값 = null) 검색어가 있을시 검색 기준은 필수 입니다
