import React, { useState } from "react";
import styles from "./CategoryList.module.css";
import { Category, CategoryProps } from "shared/type/AdminType";
import { DownIcon } from "utils/icon";

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
      <DownIcon
        width="24"
        height="24"
        fill="black"
        onClick={handleDropDown}
        className={styles.icon}
      />
      <div className={styles.selectOption}>{selectedCategory.list}</div>
      {isVisible && (
        <ul className={styles.categoryWrapper}>
          {categorys.map((category) => (
            <li
              key={category.id}
              className={styles.categoryLabel}
              onClick={() => handleSelectOption(category)}
            >
              {category.list}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

//카테고리 변경하는 드랍다운
