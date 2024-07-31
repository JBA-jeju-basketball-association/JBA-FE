import React from "react";
import { CommonModal } from "shared/ui";
import Button from "shared/ui/button";
import styles from "./AdminEditChoiceModal.module.css";
import confirmAndCancelAlertWithLoading from "shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import {
  useAdminCompetitionDelete,
  useAdminScheduleDelete,
} from "pages/admin/api/useAdminCompetitionDatas";

type AdminDeleteChoiceModalPops = {
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

export const AdminDeleteChoiceModal = ({
  modalOpen,
  setModalOpen,
  lists,
}: AdminDeleteChoiceModalPops) => {
  const { mutate: competitionDelete } = useAdminCompetitionDelete();
  const { mutate: scheduleDelete } = useAdminScheduleDelete();

  if (!lists) return null;

  const { competitionId, phase } = lists;

  const handleDelete = (phase: string) => {
    switch (phase) {
      case "INFO":
        return confirmAndCancelAlertWithLoading(
          "warning",
          "대회를 삭제하시겠습니까?",
          "",
          async () => {
            if (competitionId) competitionDelete(competitionId);
          }
        );

      case "SCHEDULE":
        return confirmAndCancelAlertWithLoading(
          "warning",
          "일정을 삭제하시겠습니까?",
          "",
          async () => {
            if (competitionId) scheduleDelete(competitionId);
          }
        );

      case "FINISH":
        return confirmAndCancelAlertWithLoading(
          "warning",
          "결과를 삭제하시겠습니까?",
          "",
          async () => {
            if (competitionId) scheduleDelete(competitionId);
          }
        );

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
              onClick={() => handleDelete("INFO")}
            >
              대회 정보 삭제
            </Button>
          </div>
          <div className={styles.btnStyles}>
            {phase === "SCHEDULE" && (
              <Button
                className={styles.detailBtn}
                onClick={() => handleDelete("SCHEDULE")}
              >
                일정 삭제
              </Button>
            )}
            {phase === "FINISH" && (
              <Button
                className={styles.detailBtn}
                onClick={() => handleDelete("FINISH")}
              >
                결과 삭제
              </Button>
            )}
          </div>
        </div>
      </div>
    </CommonModal>
  );
};
