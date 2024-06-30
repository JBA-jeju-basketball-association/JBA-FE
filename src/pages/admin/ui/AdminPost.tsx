import React from "react";
import styles from "./AdminPost.module.css";
import { AdminSearchForm } from "features/admin/";
import {
  postListLength,
  postCategories,
  postLabel,
} from "../adminUtils/adminPostTitle";

export const AdminPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.searchFormWapper}>
        {/* <AdminSearchForm categories={postCategories} label={postLabel} /> */}
      </div>
      <div className={styles.listWrapper}>목록 영역</div>
    </div>
  );
};
