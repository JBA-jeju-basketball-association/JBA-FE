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
import { useAdminUserDatas } from "../api/useAdminUserDatas";
import { useAdminUserStore } from "shared/model/stores/AdminUserStore";
import { AdminSearchForm } from "features/admin";
import { useFlattenData } from "shared/hook/useFlattenData";
import { CSVLink } from "react-csv";

export const AdminUser = () => {
  const flattenDatas = useFlattenData();
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

  const adminUserData = adminUserDatas?.data.data ?? [];
  const totalPage = adminUserDatas?.data.data.totalPages ?? 0;

  const handleSearch = () => {
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
            총 {adminUserData.totalElements || "0"}건
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
            {adminUserData.content && (
              <CSVLink
                headers={userCsv}
                data={adminUserData.content}
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
          lists={adminUserData.content}
        />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};
