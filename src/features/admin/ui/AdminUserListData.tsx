import React, { useState } from "react";
import styles from "./AdminUserListData.module.css";
import { AdminUserListProps } from "shared/type/AdminType";
import { UserListsType } from "shared/type/AdminType";
import Button from "shared/ui/button";
import { PermissionDetailModal } from "entities/admin/index";
import { userPermissionMap } from "pages/admin/adminUtils/adminUserTitle";

export const AdminUserListData = ({ titles, lists }: AdminUserListProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectUser, setSelectUser] = useState<UserListsType | null>(null);
  const gender = (gender: string) => (gender === "mail" ? "남자" : "여자");
  const permissions = (permission: string) => {
    const findPermission = userPermissionMap.find(
      (user) => user.value === permission
    );
    return findPermission?.label || "없음";
  };

  const userStatus = (status: string) => {
    switch (status) {
      case "normal":
        return "정상";
      case "hide":
        return "비활성화";
      case "delete":
        return "탈퇴";
      default:
        return "없음";
    }
  };

  const changePermissionClick = (user: UserListsType) => {
    setSelectUser(user);
    setModalOpen(true);
  };

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
                onClick={() => changePermissionClick(list)}
              >
                {permissions(list.permission)}
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
      <PermissionDetailModal
        modalOpen={modalOpen}
        setModalOpen={() => setModalOpen(false)}
        selectUser={selectUser}
      />
    </div>
  );
};
