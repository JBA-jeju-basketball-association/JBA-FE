import React from "react";
import { CommonModal } from "shared/ui";
import Button from "shared/ui/button";
import styles from "./AdminEditChoiceModal.module.css";

type AdminEditChoiceModalProps = {
  modalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  lists: any;
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

export const AdminEditChoiceModal = ({
  modalOpen,
  setModalOpen,
  lists,
}: AdminEditChoiceModalProps) => {
  if (!lists) return null;

  const { competitionId, phase } = lists;

  const handleNavigateToEditPage = (phase: string) => {
    switch (phase) {
      case "INFO":
        return window.open(`/competition/update/${competitionId}`);

      case "SCHEDULE":
        return window.open(`/competition/update/schedule/${competitionId}`);

      case "FINISH":
        return window.open(`/competition/update/result/${competitionId}`);

      default:
        return "";
    }
  };

  return (
    <CommonModal
      isopen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={customModalStyles}
    >
      <div className={styles.container}>
        <h1>원하는 작업을 선택하세요.</h1>
        <div className={styles.btn}>
          <div className={styles.btnStyles}>
            <Button
              className={styles.detailBtn}
              onClick={() => handleNavigateToEditPage("INFO")}
            >
              대회 정보 수정
            </Button>
          </div>
          <div className={styles.btnStyles}>
            {phase === "SCHEDULE" && (
              <Button
                className={styles.detailBtn}
                onClick={() => handleNavigateToEditPage("SCHEDULE")}
              >
                일정 수정
              </Button>
            )}
            {phase === "FINISH" && (
              <Button
                className={styles.detailBtn}
                onClick={() => handleNavigateToEditPage("FINISH")}
              >
                결과 수정
              </Button>
            )}
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
