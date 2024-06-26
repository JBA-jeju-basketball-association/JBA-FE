import React from "react";
import { CategoryList } from "shared/ui";
import { AdminBasicFormProps } from "shared/type/AdminType";
import styles from "./adminBasicForm.module.css";

export const AdminBasicForm = ({ categorys, label }: AdminBasicFormProps) => {
  return (
    <div className={styles.container}>
      <label>{label}</label>
      <CategoryList categorys={categorys} />
      <input type="text" />
    </div>
  );
};

//여기는 드랍다운에 + 인풋
