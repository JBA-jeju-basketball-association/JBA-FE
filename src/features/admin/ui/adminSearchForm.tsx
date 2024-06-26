import React, { useState } from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminSearchForm.module.css";
import { AdminSearchFormProps } from "shared/type/AdminType";

export const AdminSearchForm = ({
  categories,
  label,
}: AdminSearchFormProps) => {
  const [selectedCategories, setSelectedCategories] = useState([
    categories[0][0],
    categories[1][0],
    categories[2][0],
  ]);

  const handleResetCategory = () => {
    setSelectedCategories([
      categories[0][0],
      categories[1][0],
      categories[2][0],
    ]);
  };
  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        {label.map((label, index) => (
          <AdminBasicForm
            key={index}
            categories={categories[index]}
            label={label}
            selectedCategory={selectedCategories[index]}
            setSelectedCategory={(category) =>
              setSelectedCategories([
                index === 0 ? category : selectedCategories[0],
                index === 1 ? category : selectedCategories[1],
                index === 2 ? category : selectedCategories[2],
              ])
            }
          />
        ))}
      </div>
      <div className={styles.button}>
        <Button>검색</Button>
        <Button onClick={handleResetCategory}>초기화</Button>
      </div>
    </div>
  );
};

// //여기는 회원관리 페이지의 검색 폼, 버튼까지 추가된 것들
// //label이 하나만 넘어가니까 string
