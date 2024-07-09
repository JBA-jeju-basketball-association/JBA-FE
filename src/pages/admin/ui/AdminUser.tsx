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
} from "../adminUtils/adminUserTitle";
import { AdminUserListData } from "features/admin";
import { useAdminUserDatas } from "../api/useAdminUserDatas";
import { useAdminUserStore } from "shared/model/stores/AdminUserStore";
import { AdminSearchForm } from "features/admin";

export const AdminUser = () => {
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
  const [isEnabled, setIsEnabled] = useState(false);

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

//기한 검색 필터는 데이트피커 사용하기
//n건->여기에 총 데이터 갯수 넣기
