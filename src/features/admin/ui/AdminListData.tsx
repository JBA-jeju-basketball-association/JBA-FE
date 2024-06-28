import React from "react";
import styles from "./AdminListData.module.css";
import { AdminListDataContainer } from "shared/ui";

export const AdminListData = () => {
  const titles = [
    "아이디",
    "이름",
    "소속팀",
    "권한",
    "이메일",
    "휴대폰 번호",
    " 생년월일",
    "성별",
    "유저 상태",
    "최근 로그인 일시",
    "가입 일시",
    "최종 수정 일시",
    "잠금 일시",
    "탈퇴 일시",
    "로그인 실패 횟수",
  ];

  const contents = [
    [
      "wldyd",
      "박지용",
      "경기부",
      "관리자",
      "123@123.com",
      "010-1234-1234",
      "1996-12-12",
      "남자",
      "정상",
      "2021-10-12 02:02:02",
      "2021-10-12 05:05:05",
      "2021-10-12 07:07:07",
      "2021-10-12 09:09:09",
      "2021-10-12 12:12:12",
      "2",
    ],
    [
      "wldyd",
      "박지용",
      "경기부",
      "관리자",
      "123@123.com",
      "010-1234-1234",
      "1996-12-12",
      "남자",
      "정상",
      "2021-10-12 02:02:02",
      "2021-10-12 05:05:05",
      "2021-10-12 07:07:07",
      "2021-10-12 09:09:09",
      "2021-10-12 12:12:12",
      "2",
    ],
  ];

  return (
    <div className={styles.container}>
      <h1>{titles}</h1>
      {contents.map((content, index) => (
        <div className={styles.contentWrapper}>
          <AdminListDataContainer key={index} content={content} />
        </div>
      ))}
    </div>
  );
};
