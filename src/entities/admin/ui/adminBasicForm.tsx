import React from "react";
import { CategoryList } from "shared/ui";
import { AdminBasicFormProps } from "shared/type/AdminType";
import styles from "./adminBasicForm.module.css";

export const AdminBasicForm = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  label,
  showInput = true,
  searchKeyword,
  setSearchKeyword,
}: AdminBasicFormProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchKeyword(value); // 인풋 값 즉시 반영
  };

  return (
    <div className={styles.container}>
      <label>{label}</label>
      <div className={styles.CategoryListWrapper}>
        <CategoryList
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
      {showInput && (
        <input
          type="text"
          className={styles.basicFormInput}
          value={searchKeyword}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

//이건 공통으로 사용할 곳