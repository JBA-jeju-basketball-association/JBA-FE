// AdminSearchForm.tsx
import React from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminPostSearchForm.module.css";
import { AdminSearchFormProps } from "shared/type/AdminType";
import { CustomDatePicker } from "features/datepicker";
import {
  firPostcategory,
  secPostcategory,
  postLabel,
} from "pages/admin/adminUtils/adminPostTitle";
import { useAdminPostStore } from "shared/model/stores/AdminPostStore";

export const AdminPostSearchForm = ({ refetch }: AdminSearchFormProps) => {
  const {
    selectedfirstCategory,
    searchKeyword,
    selectedSecondCategory,
    startDate,
    endDate,
    setSelectedfirstCategory,
    setSearchKeyword,
    setSelectedSecondCategory,
    setStartDate,
    setEndDate,
  } = useAdminPostStore();

  const handleSearch = () => {
    setSelectedfirstCategory(selectedfirstCategory);
    setSelectedSecondCategory(selectedSecondCategory);
    setSearchKeyword(searchKeyword);
  };

  const handleReset = () => {
    setSelectedSecondCategory(secPostcategory[0]);
    setSelectedfirstCategory(firPostcategory[0]);
    setSearchKeyword("");
    setStartDate(null);
    setEndDate(null);
    refetch();
  };

  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        <AdminBasicForm
          label={postLabel[0]}
          categories={firPostcategory}
          selectedCategory={selectedfirstCategory}
          setSelectedCategory={setSelectedfirstCategory}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        <AdminBasicForm
          label={postLabel[1]}
          categories={secPostcategory}
          selectedCategory={selectedSecondCategory}
          setSelectedCategory={setSelectedSecondCategory}
          showInput={false}
        />
        <div className={styles.DatePicker}>
          {postLabel[2]}
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
