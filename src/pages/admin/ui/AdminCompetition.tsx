import React from "react";
import styles from "./AdminCompetition.module.css";
import { AdminSearchForm } from "features/admin/";

export const AdminCompetition = () => {
  const label = ["검색어", "종별", "등록일시"];
  const categories = [
    [
      { id: 1, list: "대회명" },
      { id: 2, list: "유저 이메일" },
      { id: 3, list: "게시물 아이디" },
    ],
    [
      { id: 1, list: "전체" },
      { id: 2, list: "종별 A" },
      { id: 3, list: "종별 B" },
      { id: 4, list: "종별 C" },
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
