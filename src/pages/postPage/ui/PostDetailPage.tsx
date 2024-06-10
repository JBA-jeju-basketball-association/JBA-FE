import React from "react";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import styles from "./PostDetailPage.module.css";

export const PostDetailPage = () => {
  let { postId, category } = useParams();

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

  console.log(postDetail);

  return (
    <div className={styles.container}>
      <span>{category}</span>
      <div className={styles.wrapper}>
        <span>
          [{postDetail.foreword}] {postDetail.title}
        </span>
        <span>{postDetail.writer}</span>
        <span>{postDetail.createAt}</span>
        <span>{postDetail.viewCount}</span>
        <div>{parse(postDetail.content)}</div>
        <div>
          포스트 이미지: {postDetail.postImgs.length ? postDetail.postImgs : "이미지 없음"}
        </div>
        <div>
          <div>
            포스트 파일: {postDetail.files.length ? postDetail.files : "파일 없음"}
          </div>
        </div>
      </div>
    </div>
  );
};
