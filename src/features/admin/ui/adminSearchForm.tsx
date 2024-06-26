import React from "react";
import { AdminBasicForm } from "entities/admin";
import Button from "shared/ui/button//index";
import styles from "./AdminSearchForm.module.css";
import { AdminSearchFormProps } from "shared/type/AdminType";

export const AdminSearchForm = ({ categorys, label }: AdminSearchFormProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.basicForm}>
        <AdminBasicForm categorys={categorys[0]} label={label[0]} />
        <AdminBasicForm categorys={categorys[1]} label={label[1]} />
        <AdminBasicForm categorys={categorys[2]} label={label[2]} />
      </div>
      <div className={styles.button}>
        <Button>검색</Button>
        <Button>초기화</Button>
      </div>
    </div>
  );
};

//여기는 회원관리 페이지의 검색 폼, 버튼까지 추가된 것들
//label이 하나만 넘어가니까 string
