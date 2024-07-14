import React, { useState } from "react";
import styles from "./AdminPost.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import { AdminCompetitionListData } from "features/admin/ui/AdminCompetitionListData";
import Button from "shared/ui/button";
import {
  competitionListLength,
  competitionLabel,
  competitionListTitles,
  fircompetitioncategory,
  seccompetitioncategory,
} from "pages/admin/adminUtils/adminCompetitionTitle";
import { useAdminCompetitionStore } from "shared/model/stores/AdminCompetitionStore";
import { useAdminCompetitionDatas } from "pages/admin/api/useAdminCompetitionDatas";
import { AdminSearchForm } from "features/admin";
import { SituationBtn } from "features/admin";

export const AdminCompetition = () => {
  const [isEnabled, setIsEnabled] = useState(false);

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
    selectSituation,
    setSelectSituation,
  } = useAdminCompetitionStore();

  const { data: adminCompetitionDatas, refetch } = useAdminCompetitionDatas(
    {
      page,
      competitionListLength: selectedCategory.list,
      firstCategory: selectedfirstCategory.list,
      searchKeyword,
      selectedSecondCategory: selectedSecondCategory.list,
      startDate,
      endDate,
      situationList: selectSituation.list,
    },
    isEnabled
  );

  const handleNavigateToUploadPage = () => {
    window.open("/competition/post", "_blank");
  };

  const handleSearch = () => {
    setIsEnabled(true);
    refetch();
  };

  const handleReset = () => {};

  const adminCompetitionData = adminCompetitionDatas?.data.data ?? [];
  //대회 상세 데이터
  const totalPage = adminCompetitionDatas?.data.data ?? 0;
  //대회 데이터 총 페이지

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm
          label={competitionLabel}
          firstCategoryOptions={fircompetitioncategory}
          secondCategoryOptions={seccompetitioncategory}
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
        <SituationBtn setSelectSituation={setSelectSituation} />
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
