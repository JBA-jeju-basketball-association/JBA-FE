import React, { useState } from "react";
import styles from "./AdminUser.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";
import {
  userLabel,
  userCategories,
  userListLength,
  userListTitles,
} from "../adminUtils/adminUserTitle";
import { Category } from "shared/type/AdminType";

export const AdminUser = () => {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    userListLength[0]
  );
  const totalPage = 10;

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categories={userCategories} label={userLabel} /> */}
      </div>
      <div className={styles.listWrapper}>
        <div className={styles.listLength}>
          총 n건
          <CategoryList
            categories={userListLength}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          개씩 보기
        </div>
        {/* <AdminListData titles={userListTitles} /> */}
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

//기한 검색 필터는 데이트피커 사용하기
//n건->여기에 총 데이터 갯수 넣기
