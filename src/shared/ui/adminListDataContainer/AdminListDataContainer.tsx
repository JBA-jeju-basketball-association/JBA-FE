import React from "react";
import styles from "./AdminListDataContainer.css";

type AdminListDataContainerProps = {
  title: string[];
  content: string[];
};

export const AdminListDataContainer = ({
  title,
  content,
}: AdminListDataContainerProps) => {
  return (
    <div className={styles.container}>
      <h1>{title}</h1>
      <div>{content}</div>
    </div>
  );
};
