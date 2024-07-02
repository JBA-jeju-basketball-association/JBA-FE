import React, { useState, useEffect } from "react";
import styles from "./AdminPost.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminCompetitionListData } from "features/admin/ui/AdminCompetitionListData";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import {
  competitionListLength,
  competitionLabel,
  competitionListTitles,
} from "pages/admin/adminUtils/adminCompetitionTitle";

export const AdminCompetition = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(
    competitionListLength[0]
  );
  const totalPage = 10;

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categories={gallerySearchCriteria} label={galleryLabel} /> */}
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          {/* <div className={styles.listLength}>
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
          </div> */}
        </div>
        {/* <AdminCompetitionListData
          titles={competitionListTitles}
          lists={adminPostData.posts}
        /> */}
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
