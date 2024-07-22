import React, { useState } from "react";
import styles from "./AdminUser.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import {
  userLabel,
  userListLength,
  firUsercategory,
  secUsercategory,
  userListTitles,
  userCsv,
} from "../adminUtils/adminUserTitle";
import { AdminUserListData } from "features/admin";
import { useAdminUserDatas, useAdminUserCsv } from "../api/useAdminUserDatas";
import { useAdminUserStore } from "shared/model/stores/AdminUserStore";
import { AdminSearchForm } from "features/admin";
import { CSVLink } from "react-csv";
import confirmAlert from "shared/lib/ConfirmAlert";

export const AdminUser = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const {
    page,
    selectedCategory,
    selectedfirstCategory,
    searchKeyword,
    selectedSecondCategory,
    startDate,
    endDate,

    setPage,
    setSelectedCategory,
    setSelectedfirstCategory,
    setSearchKeyword,
    setSelectedSecondCategory,
    setStartDate,
    setEndDate,
  } = useAdminUserStore();

  const { data: adminUserDatas, refetch } = useAdminUserDatas(
    {
      page,
      userListLength: selectedCategory.list,
      firstCategory: selectedfirstCategory.list,
      secondCategory: selectedSecondCategory.list,
      searchKeyword,
      startDate,
      endDate,
    },
    isEnabled
  );

  const { data: userCsvDatas } = useAdminUserCsv(isEnabled);

  const handleSearch = () => {
    if (adminUserDatas?.totalElements === 0) {
      confirmAlert("info", "조회 가능한 데이터가 없습니다.");
      return;
    }
    setIsEnabled(true);
    refetch();
  };

  const handleReset = () => {
    setSelectedfirstCategory(firUsercategory[0]);
    setSelectedSecondCategory(secUsercategory[0]);
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    setIsEnabled(false);
  };
  const csvData = userCsvDatas?.data.data.content ?? [];

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm
          label={userLabel}
          firstCategoryOptions={firUsercategory}
          secondCategoryOptions={secUsercategory}
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
            총 {adminUserDatas?.totalElements || "0"}건
            <div className={styles.CategoryListWrapper}>
              <CategoryList
                categories={userListLength}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
            개씩 보기
          </div>
          <div>
            {adminUserDatas?.content && (
              <CSVLink
                headers={userCsv}
                data={csvData}
                filename="user.csv"
                className={styles.csvBtn}
              >
                엑셀 다운로드
              </CSVLink>
            )}
          </div>
        </div>
        <AdminUserListData
          titles={userListTitles}
          lists={adminUserDatas?.content}
        />
        <Pagination
          totalPages={adminUserDatas?.totalPages}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};
