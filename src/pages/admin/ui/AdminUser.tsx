import React, { useState } from "react";
import { AdminSearchForm, AdminListData } from "features/admin/";
import styles from "./AdminUser.module.css";
import { Pagination } from "widgets/pagination";
import { CategoryList } from "shared/ui";

export const AdminUser = () => {
  const [page, setPage] = useState(1);
  const totalPage = 10;

  const label = ["검색어", "권한", "가입일시"];
  const categories = [
    [
      { list: "이름" },
      { list: "이메일" },
      { list: "아이디" },
      { list: "소속팀" },
    ],
    [
      { list: "전체" },
      { list: "유저" },
      { list: "심판" },
      { list: "심판 리더" },
      { list: "경기부" },
      { list: "경기부 리더" },
      { list: "관리자" },
      { list: "마스터" },
    ],
  ];

  const listLength = [{ list: "20개" }, { list: "50개" }, { list: "100개" }];

  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        <AdminSearchForm categories={categories} label={label} />
      </div>
      <div className={styles.listWrapper}>
        <p className={styles.listLength}>
          총 n건 <CategoryList categories={listLength} /> 개씩 보기
        </p>
        <AdminListData />
        <Pagination totalPages={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

//기한 검색 필터는 데이트피커 사용하기
//n건->여기에 총 데이터 갯수 넣기
