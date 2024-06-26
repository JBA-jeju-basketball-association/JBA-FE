import React from "react";
import { AdminSearchForm } from "features/admin/";
import styles from "./AdminUser.module.css";

export const AdminUser = () => {
  const label = ["검색어", "가입일시", "권한"];
  const categorys = [
    [
      { id: 1, list: "이름" },
      { id: 2, list: "이메일" },
      { id: 3, list: "아이디" },
      { id: 4, list: "소속팀" },
    ],
    [
      { id: 1, list: "전체" },
      { id: 2, list: "유저" },
      { id: 3, list: "심판" },
      { id: 4, list: "심판 리더" },
      { id: 5, list: "경기부" },
      { id: 6, list: "경기부 리더" },
      { id: 7, list: "관리자" },
      { id: 8, list: "마스터" },
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
        <AdminSearchForm categorys={categorys} label={label} />
      </div>
      <div className={styles.listWrapper}>목록 영역</div>
    </div>
  );
};
