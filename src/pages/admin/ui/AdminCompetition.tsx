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
  competitionCsv,
} from "pages/admin/adminUtils/adminCompetitionTitle";
import { useAdminCompetitionStore } from "shared/model/stores/AdminCompetitionStore";
import {
  useAdminCompetitionDatas,
  useAdminCompetitionCsv,
} from "pages/admin/api/useAdminCompetitionDatas";
import { AdminSearchForm } from "features/admin";
import { SituationBtn } from "features/admin";
import { CSVLink } from "react-csv";
import confirmAlert from "shared/lib/alert/ConfirmAlert";

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

  const { data: competitionCsvDatas } = useAdminCompetitionCsv(isEnabled);

  const handleNavigateToUploadPage = () => {
    window.open("/competition/post");
  };

  const handleSearch = () => {
    if (adminCompetitionDatas?.totalElements === 0) {
      confirmAlert("info", "조회 가능한 데이터가 없습니다.");
      return;
    }
    setIsEnabled(true);
    refetch();
  };

  const handleReset = () => {
    setSelectedfirstCategory(fircompetitioncategory[0]);
    setSelectedSecondCategory(seccompetitioncategory[0]);
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setIsEnabled(false);
    refetch();
  };

  const csvData = competitionCsvDatas?.data.data.content ?? [];
  
  const flattenCompetition = (content: any) => {
    return content?.map((data: any) => ({
      ...data,
      files: data.files.map((file: any) => file.filePath).join(","),
    }));
  };

  const competitionCsvData = flattenCompetition(csvData);

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
            총 {adminCompetitionDatas?.totalElements || "0"}건
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
            {adminCompetitionDatas?.content && (
              <CSVLink
                headers={competitionCsv}
                data={competitionCsvData}
                filename="Competition.csv"
                className={styles.csvBtn}
              >
                엑셀 다운로드
              </CSVLink>
            )}
          </div>
        </div>
        <AdminCompetitionListData
          titles={competitionListTitles}
          lists={adminCompetitionDatas?.content}
        />
        <Pagination
          totalPages={adminCompetitionDatas?.totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
