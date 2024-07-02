// AdminSearchForm.tsx
import React, { useState } from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminSearchForm.module.css";
import { AdminSearchFormProps} from "shared/type/AdminType";
import { CustomDatePicker } from "features/datepicker";
import {
  firPostcategory,
  secPostcategory,
} from "pages/admin/adminUtils/adminPostTitle";

export const AdminSearchForm = ({
  label,
  selectedfirstCategory,
  setSelectedfirstCategory,
  selectedSecondCategory,
  setSelectedSecondCategory,
  searchKeyword,
  setSearchKeyword,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  refetch,
}: AdminSearchFormProps) => {
  const handleSearch = () => {
    setSelectedfirstCategory(selectedfirstCategory);
    setSelectedSecondCategory(selectedSecondCategory);
    setSearchKeyword(searchKeyword);
  };

  const handleReset = () => {
    setSelectedSecondCategory(secPostcategory[0]);
    setSelectedfirstCategory(firPostcategory[0]);
    setSearchKeyword("");
    refetch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        <AdminBasicForm
          label={label[0]}
          categories={firPostcategory}
          selectedCategory={selectedfirstCategory}
          setSelectedCategory={setSelectedfirstCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <AdminBasicForm
          label={label[1]}
          categories={secPostcategory}
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
