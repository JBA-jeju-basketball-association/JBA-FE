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
        <ul className={styles.titleArea}>
          <li className={styles.title}>8888888888</li>
          <li className={styles.list}></li>
          {typeItems.map((item, index) => (
            <li key={index} className={styles.list}>
              {item}
            </li>
          ))}
          <li></li>
          <li className={styles.list}>{8888888888}</li>
          <li className={styles.list}>{8888888888}</li>
          <li className={styles.list}>{8888888888}</li>
        </ul>
        <div className={styles.subLine}></div>
        <div className={styles.content}>{888888888}</div>
        <div className={styles.filesWrapper}>
          <div className={styles.subLine}></div>
            <span className={styles.fileNull}>첨부파일 없음</span>
          <div className={styles.subLine}></div>
        </div>
      </div>
      <Button onClick={() => navigate(`/post/${category}`)}>작성 취소</Button>
    </div>
  );
};
