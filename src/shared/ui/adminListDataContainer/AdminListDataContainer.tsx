import React from "react";
import styles from "./AdminListDataContainer.module.css";

type AdminListDataContainerProps = {
  content: string[];
};

export const AdminListDataContainer = ({
  content,
}: AdminListDataContainerProps) => {
  return <div>{content}</div>;
};
