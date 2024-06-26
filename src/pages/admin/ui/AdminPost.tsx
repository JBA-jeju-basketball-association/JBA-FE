import React from "react";
import styles from "./AdminPost.module.css";
import { AdminSearchForm } from "features/admin/";

export const AdminPost = () => {
  const label = ["검색어", "카테고리", "등록일시"];
  const categories = [
    [
      { id: 1, list: "제목" },
      { id: 2, list: "유저 이메일" },
      { id: 3, list: "게시물 아이디" },
    ],
    [
      { id: 1, list: "공지사항" },
      { id: 2, list: "자료실" },
      { id: 3, list: "NEWS" },
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
