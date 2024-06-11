import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import styles from "./AddPostPage.module.css";

export const AddPostPage = () => {
  let { category } = useParams();
  const navigate = useNavigate();

  const typeItems = ["등록자", "등록일", "조회수"];
  category = category as string;
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <span className={styles.category}>{detailTitle}</span>
        </div>
        <div className={styles.divideLine}></div>
        <div className={styles.subLine}></div>
        <div className={styles.content}>에디터 자리</div>
        <div className={styles.filesWrapper}>
          <div className={styles.subLine}></div>
          <span className={styles.fileNull}>파일 업로드 자리</span>
          <div className={styles.subLine}></div>
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button onClick={() => alert("작성이 완료되었습니다!")}>
          작성 완료
        </Button>
        <Button
          className={styles.buttonCancel}
          // onClick={() => navigate(`/post/${category}`)}
          onClick={() => alert("작성이 취소되었습니다.")}
        >
          취소
        </Button>
      </div>
    </div>
  );
};
