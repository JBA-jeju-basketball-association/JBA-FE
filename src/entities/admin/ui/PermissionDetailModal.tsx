import React, { useState, useEffect } from "react";
import { CommonModal } from "shared/ui";
import styles from "./PermissionDetailModal.module.css";
import Button from "shared/ui/button";
import { userPermissionMap } from "pages/admin/adminUtils/adminUserTitle";
import confirmAndCancelAlertWithLoading from "shared/lib/ConfirmAndCancelAlertWithLoading";

type PermissionModalProps = {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  selectUser: any;
};

const customModalStyles: ReactModal.Styles = {
  overlay: {
    backgroundColor: " rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100vh",
    zIndex: "101",
    position: "fixed",
    top: "0",
    left: "0",
  },
  content: {
    width: "620px",
    height: "325px",
    zIndex: "102",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    border: "none",
    overflow: "auto",
  },
};

export const PermissionDetailModal = ({
  modalOpen,
  setModalOpen,
  selectUser,
}: PermissionModalProps) => {
  const [selectedPermission, setSelectedPermission] = useState(
    userPermissionMap[0].value
  );

  useEffect(() => {
    if (selectUser) {
      setSelectedPermission(selectUser.permission);
    }
  }, [selectUser]);

  if (!selectUser) return null;

  const { name, team, email, phoneNum } = selectUser;

  const handlePermissionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPermission(e.target.value);
  };

  const confirmPermissionChange = (userId: number) => {
    confirmAndCancelAlertWithLoading("warning", "권한을 변경하시겠습니까?", "");
    setModalOpen(false);
    console.log(userId);
  };

  return (
    <CommonModal
      isopen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>권한변경</h1>
          <Button
            className={styles.closeBtn}
            onClick={() => setModalOpen(false)}
          >
            닫기
          </Button>
        </div>
        <div className={styles.content}>
          <div>
            <h2>이름</h2>
            <span>{name}</span>
          </div>
          <div>
            <h2>소속팀</h2>
            <span>{team}</span>
          </div>
          <div>
            <h2>권한</h2>
            <span>
              <select
                className={styles.select}
                value={selectedPermission}
                onChange={handlePermissionChange}
              >
                {userPermissionMap.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </span>
          </div>
          <div>
            <h2>이메일</h2>
            <span>{email}</span>
          </div>
          <div>
            <h2>연락처</h2>
            <span>{phoneNum}</span>
          </div>
        </div>
        <Button
          className={styles.checkBtn}
          onClick={() => confirmPermissionChange(selectUser.userId)}
        >
          확인
        </Button>
      </div>
    </CommonModal>
  );
};
