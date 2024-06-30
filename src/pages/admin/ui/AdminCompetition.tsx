import React from "react";
import styles from "./AdminCompetition.module.css";
import { AdminSearchForm } from "features/admin/";
import {
  competitionListLength,
  competitionLabel,
  competitionCategories,
} from "../adminUtils/adminCompetitionTitle";

export const AdminCompetition = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm
          categories={competitionCategories}
          label={competitionLabel}
        /> */}
      </div>
      <div className={styles.listWrapper}>목록 영역</div>
    </div>
  );
};
