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
}: AdminBasicFormProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div className={styles.container}>
      <label>{label}</label>
      {showCategory ? (
        <>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <input type="text" className={styles.basicFormInput} />
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

// //여기는 드랍다운에 + 인풋
