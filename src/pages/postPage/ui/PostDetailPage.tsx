import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./PostDetailPage.module.css";

export const PostDetailPage = () => {
  let { postId, category } = useParams();
  const typeItems = ["등록자", "등록일", "조회수"];
  category = category as string;
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : category === "news"
          ? "자료실"
          : "";

  const {
    isError,
    isLoading,
    data: postDetail,
  } = useQuery({
    queryKey: ["postDeatil"],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
    select: (result: any) => result.data.data,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error</span>;
  }

  const {
    foreword,
    title,
    writer,
    createAt,
    viewCount,
    content,
    postImgs,
    files,
  } = postDetail;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.categoryArea}>
          <span className={styles.category}>{detailTitle}</span>
        </div>
        <div className={styles.divideLine}></div>
        <ul className={styles.titleArea}>
          <li className={styles.title}>{title}</li>
          <li className={styles.list}></li>
          {typeItems.map((item) => (
            <li className={styles.list}>{item}</li>
          ))}
          <li></li>
          <li className={styles.list}>{writer}</li>
          <li className={styles.list}>{createAt}</li>
          <li className={styles.list}>{viewCount}</li>
        </ul>
        <div className={styles.subLine}></div>
        <div className={styles.content}>{parse(content)}</div>
        <div className={styles.addWrapper}>
          <div className={styles.subLine}></div>
          <div>포스트 이미지: {postImgs.length ? '첨부 파일 있음' : "이미지 없음"}</div>
          <div>포스트 파일: {files.length ? '첨부파일 있음' : "파일 없음"}</div>
          <div className={styles.subLine}></div>
        </div>
      </div>
    </div>
  );
};
