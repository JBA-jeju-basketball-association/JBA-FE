import React from "react";
import styles from "./AdminUserListData.module.css";
import { AdminUserListProps } from "shared/type/AdminType";
import { UserListsType } from "shared/type/AdminType";
import Button from "shared/ui/button";

export const AdminUserListData = ({ titles, lists }: AdminUserListProps) => {
  const gender = (gender: string) => (gender === "mail" ? "남자" : "여자");

  const userStatus = (status: string) => {
    switch (status) {
      case "normal":
        return "정상";
      case "hide":
        return "잠금";
      case "delete":
        return "탈퇴";
      default:
        return "없음";
    }
  };

  const changePermissionClick = (userId: number) => {};
  //유저 권한 변경

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        {titles.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        {lists?.map((list: UserListsType) => (
          <div key={list.userId} className={styles.listWrapper}>
            <span>{list.userId}</span>
            <span>{list.name}</span>
            <span>{list.team}</span>
            <span className={styles.btn}>
              <Button
                className={styles.updateBtn}
                onClick={() => changePermissionClick}
              >
                {list.permission}
              </Button>
            </span>
            <span>{list.email}</span>
            <span>{list.phoneNum}</span>
            <span>{list.dateOfBirth || "없음"}</span>
            <span>{gender(list.gender)}</span>
            <span>{userStatus(list.userStatus)}</span>
            <span>{list.loginAt || "없음"}</span>
            <span>{list.createAt}</span>
            <span>{list.updateAt || "없음"}</span>
            <span>{list.lockAt || "없음"}</span>
            <span>{list.deleteAt || "없음"}</span>
            <span>{list.failureCount || "없음"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
