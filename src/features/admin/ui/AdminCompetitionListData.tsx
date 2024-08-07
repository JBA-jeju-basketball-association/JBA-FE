import React, { useState } from "react";
import styles from "./AdminCompetitionListData.module.css";
import Button from "shared/ui/button";
import {
  AdminCompetitionListProps,
  CompetitionListsType,
} from "shared/type/AdminType";
import { useTruncateString } from "shared/hook/useTruncateString";
import confirmAndCancelAlertWithLoading from "shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import { useAdminCompetitionDelete } from "pages/admin/api/useAdminCompetitionDatas";
import { AdminEditChoiceModal, AdminDeleteChoiceModal } from "entities/admin";

export const AdminCompetitionListData = ({
  titles,
  lists,
}: AdminCompetitionListProps) => {
  const [modalOpen, setModalOpen] = useState({
    edit: false,
    delete: false,
  });
  const [selectCompetition, setSelectCompetition] =
    useState<CompetitionListsType | null>(null);

  const formatDate = (date: string | null) => date?.split("T")[0];

  const deleteT = (date: string | null) => date?.replace("T", " ");

  const { mutate: competitionDelete } = useAdminCompetitionDelete();

  const truncateString = useTruncateString();

  const competitionStatus = (status: string) => {
    switch (status) {
      case "NORMAL":
        return "정상";
      case "HIDE":
        return "비활성화";
      case "DELETE":
        return "삭제";
      default:
        return "없음";
    }
  };

  const handleNavigateToDetailPage = (competitionId: string) => {
    window.open(`/competition/${competitionId}`);
  };
  //상세페이지 이동

  const handleNavigateToResultUpload = (
    competitionId: string,
    phase: string
  ) => {
    switch (phase) {
      case "INFO":
        return window.open(`/competition/post/schedule/${competitionId}`);

      case "SCHEDULE":
        return window.open(`/competition/post/result/${competitionId}`);

      default:
        return "";
    }
  };
  //대회결과등록 페이지

  const handleNavigateToEditPage = (competition: CompetitionListsType) => {
    if (competition.phase === "INFO") {
      window.open(`/competition/update/${competition.competitionId}`);
      return;
    }
    setModalOpen((prev) => ({
      ...prev,
      edit: true,
    }));
    setSelectCompetition(competition);
  };

  //수정페이지 이동

  const handleDeleteClick = (competition: CompetitionListsType) => {
    if (competition.phase === "INFO") {
      confirmAndCancelAlertWithLoading(
        "warning",
        "대회를 삭제하시겠습니까?",
        "",
        async () => {
          if (competition.competitionId)
            competitionDelete(competition.competitionId);
        }
      );
      return;
    }
    setModalOpen((prev) => ({
      ...prev,
      delete: true,
    }));
    setSelectCompetition(competition);
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        {titles.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        {lists?.map((list: CompetitionListsType) => (
          <div key={list.competitionId} className={styles.listWrapper}>
            <span>{list.competitionId}</span>
            <span>{list.userEmail}</span>
            <span className={styles.btn}>
              <Button
                className={styles.updateBtn}
                onClick={() => handleNavigateToEditPage(list)}
              >
                수정
              </Button>
              <Button
                className={styles.deleteBtn}
                onClick={() => handleDeleteClick(list)}
              >
                삭제
              </Button>
              {list.phase === "INFO" && (
                <Button
                  className={styles.resultBtn}
                  onClick={() =>
                    handleNavigateToResultUpload(list.competitionId, list.phase)
                  }
                >
                  대회일정 등록
                </Button>
              )}
              {list.phase === "SCHEDULE" && (
                <Button
                  className={styles.resultBtn}
                  onClick={() =>
                    handleNavigateToResultUpload(list.competitionId, list.phase)
                  }
                >
                  대회결과 등록
                </Button>
              )}
            </span>
            <span>{list.situation}</span>
            <span>{list.divisions}</span>
            <span
              className={styles.competitionName}
              onClick={() => handleNavigateToDetailPage(list.competitionId)}
            >
              {truncateString(list.competitionName, 10)}
            </span>
            <span className={styles.date}>
              {formatDate(list.startDate)} ~<br /> {formatDate(list.endDate)}
            </span>
            <span>{truncateString(list.content, 10 || "없음")}</span>
            <span className={styles.link}>
              <a href={list.link} target="_blank" rel="noreferrer">
                {truncateString(list.link || "없음", 20)}
              </a>
            </span>
            <span className={styles.file}>
              {list.files?.length > 0
                ? list.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.filePath}
                      download={file.fileName}
                      rel="noreferrer"
                    >
                      {truncateString(file.fileName, 10)}
                    </a>
                  ))
                : "없음"}
            </span>
            <span>{competitionStatus(list.status)}</span>
            <span>{deleteT(list.createAt || "없음")}</span>
            <span>{deleteT(list.updateAt || "없음")}</span>
            <span>{deleteT(list.deleteAt || "없음")}</span>
          </div>
        ))}
        <AdminEditChoiceModal
          modalOpen={modalOpen.edit}
          setModalOpen={() => setModalOpen({ ...modalOpen, edit: false })}
          lists={selectCompetition}
        />
        <AdminDeleteChoiceModal
          modalOpen={modalOpen.delete}
          setModalOpen={() => setModalOpen({ ...modalOpen, delete: false })}
          lists={selectCompetition}
        />
      </div>
    </div>
  );
};
