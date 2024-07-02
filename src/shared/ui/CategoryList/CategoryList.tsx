import React, { useState } from "react";
import styles from "./CategoryList.module.css";
import { Category, CategoryProps } from "shared/type/AdminType";
import { DownIcon } from "utils/icon";

export const CategoryList = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleDropDown = () => {
    setIsVisible(!isVisible);
  };
  //드랍다운 토글

  const handleSelectOption = (category: Category) => {
    if (setSelectedCategory) {
      setSelectedCategory(category);
    }
    setIsVisible(false);
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
      <div className={styles.selectOption}>{selectedCategory?.list}</div>
      {isVisible && (
        <ul className={styles.categoryWrapper}>
          {categories?.map((category, index) => (
            <li
              key={index}
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

