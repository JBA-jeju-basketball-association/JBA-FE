import React, { useState } from "react";
import styles from "./CategoryList.module.css";

type Category = {
  id: number;
  label: string;
};

type CategoryProps = {
  categorys: Category[];
};

export const CategoryList = ({ categorys }: CategoryProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categorys[0]);

  const handleDropDown = () => {
    setIsVisible(!isVisible);
  };
  //드랍다운 토글

  const handleSelectOption = (category: Category) => {
    setSelectedCategory(category);
    //선택한 카테고리 변경
    setIsVisible(false);
    //드랍다운 닫기
  };

  return (
    <div className={styles.container}>
      <div onClick={handleDropDown} className={styles.icon}>
        ㅇ
      </div>
      <div className={styles.selectOption}>{selectedCategory.label}</div>
      {isVisible && (
        <ul className={styles.categoryWrapper}>
          {categorys.map((category) => (
            <li
              key={category.id}
              className={styles.categoryLabel}
              onClick={() => handleSelectOption(category)}
            >
              {category.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
