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
import { useAdminCompetitionStore } from "shared/model/stores/AdminCompetitionStore";
import {
  useAdminCompetitionDatas,
  useAdminCompetitionTotal,
} from "pages/admin/api/useAdminCompetitionDatas";

export const AdminCompetition = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const navigate = useNavigate();
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
  } = useAdminCompetitionStore();

  const { data: adminCompetitionTotal } = useAdminCompetitionTotal();

  const divisionData = adminCompetitionTotal?.data.data.divisionList ?? [];
  //대회 종별 종류

  //여기까지 토탈갯수 및 divisionData

  const { data: adminCompetitionDatas, refetch } = useAdminCompetitionDatas({
    page,
    competitionListLength: selectedCategory.list,
  });

  const handleNavigateToUploadPage = () => {
    window.open("/competition/post", "_blank");
  };

  const handleSearch = () => {};

  const handleReset = () => {};

  const adminCompetitionData = adminCompetitionDatas?.data.data ?? [];
  //대회 상세 데이터
  const totalPage = adminCompetitionDatas?.data.data ?? 0;
  //대회 데이터 총 페이지

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}></div>
      <div className={styles.listWrapper}>
        <div className={styles.listLengthBox}>
          <div className={styles.listLength}>
            총 {totalPage.totalElements || "0"}건
            <div className={styles.CategoryListWrapper}>
              <CategoryList
                categories={competitionListLength}
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
              대회 등록
            </Button>
          </div>
        </div>
        <AdminCompetitionListData
          titles={competitionListTitles}
          lists={adminCompetitionData.content}
        />
        <Pagination
          totalPages={totalPage.totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
