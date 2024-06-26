import React from "react";
import styles from "./AdminGallery.module.css";
import { AdminSearchForm } from "features/admin/";

export const AdminGallery = () => {
  const label = ["검색어", "조회권한", "등록일시"];
  const categories = [
    [
      { id: 1, list: "제목" },
      { id: 2, list: "유저 아이디" },
      { id: 3, list: "갤러리 아이디" },
    ],
    [
      { id: 1, list: "전체" },
      { id: 2, list: "일반" },
      { id: 3, list: "스태프" },
    ],
    [
      { id: 1, list: "오늘" },
      { id: 2, list: "어제" },
      { id: 3, list: "엊그제" },
    ],
  ];
  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm categories={categories} label={label} />
      </div>
      <div className={styles.listWrapper}>목록 영역</div>
    </div>
  );
};
