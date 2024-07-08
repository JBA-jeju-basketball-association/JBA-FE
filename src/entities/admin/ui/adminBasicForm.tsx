import React, { useState } from "react";
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
  const [typeingTimeOut, setTypeingTimeOut] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleInputChange = (value: string) => {
    if (typeingTimeOut) {
      clearTimeout(typeingTimeOut);
    }
    setTypeingTimeOut(
      setTimeout(() => {
        setSearchKeyword(value);
      }, 500)
    );
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
          onChange={(e) => handleInputChange(e.target.value)}
        />
      )}
    </div>
  );
};
