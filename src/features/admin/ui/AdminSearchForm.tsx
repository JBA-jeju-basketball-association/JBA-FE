// AdminSearchForm.tsx
import React from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminSearchForm.module.css";
import { AdminSearchFormProps } from "shared/type/AdminType";
import { CustomDatePicker } from "features/datepicker";

export const AdminSearchForm = ({
  firstCategoryOptions,
  //첫번재 검색 폼의 카테고리 옵션
  secondCategoryOptions,
  //두번째 검색 폼의 카테고리 옵션
  label,
  //라벨
  selectedfirstCategory,
  //첫번재 카테고리 옵션 중에서 선택한 카테고리
  selectedSecondCategory,
  //두번째 카테고리 옵션 중에서 선택한 카테고리
  searchKeyword,
  startDate,
  endDate,
  setSelectedfirstCategory,
  setSearchKeyword,
  setSelectedSecondCategory,
  setStartDate,
  setEndDate,
  handleSearch,
  handleReset,
}: AdminSearchFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        <AdminBasicForm
          label={label[0]}
          categories={firstCategoryOptions}
          selectedCategory={selectedfirstCategory}
          setSelectedCategory={setSelectedfirstCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <AdminBasicForm
          label={label[1]}
          categories={secondCategoryOptions}
          selectedCategory={selectedSecondCategory}
          setSelectedCategory={setSelectedSecondCategory}
          showInput={false}
        />
        <div className={styles.DatePicker}>
          {label[2]}
          <CustomDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
      </div>
      <div className={styles.button}>
        <Button onClick={handleSearch}>검색</Button>
        <Button onClick={handleReset}>초기화</Button>
      </div>
    </div>
  );
};
