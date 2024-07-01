// AdminBasicForm.tsx
import React, { useState } from "react";
import { CategoryList } from "shared/ui";
import { AdminBasicFormProps } from "shared/type/AdminType";
import styles from "./adminBasicForm.module.css";
import { CustomDatePicker } from "features/datepicker";

export const AdminBasicForm = ({
  categories,
  label,
  selectedCategory,
  setSelectedCategory,
  showCategory = true,
  value,
  onChange,
}: AdminBasicFormProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className={styles.container}>
      <label>{label}</label>
      {showCategory ? (
        <>
          <div className={styles.CategoryListWrapper}>
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </div>
          <input
            type="text"
            className={styles.basicFormInput}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </>
      ) : (
        <CustomDatePicker
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      )}
    </div>
  );
};
