import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { useUserStore } from "../../../shared/model";
import { JwtDecoder } from "../../../shared/lib";
import styles from "./PostDetailPage.module.css";
import { DeletePost } from "../api/DeletePost";
import { LoadingSpinner, PageTitle } from "shared/ui";
import axios from "axios";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
import confirmDelete from "shared/lib/alert/ConfirmDelete";

export const PostDetailPage = () => {
  let { postId, category } = useParams();
  const navigate = useNavigate();
  const { AccessToken } = useUserStore();

  const typeItems = ["등록자", "등록일", "조회수"];
  category = category as string;
  const detailTitle =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : "자료실";

  const {
    isError,
    isLoading,
    data: postDetail,
  } = useQuery({
    queryKey: ["postDeatil", category, postId],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
    select: (result: any) => result.data.data,
  });

  const mutation = useMutation({
    mutationFn: DeletePost,
    onSuccess: () => {
      navigate(`/post/${category}`);
    },
    onError: (e) => {
      if (axios.isAxiosError(e)) {
        if (e.response?.status === 403) {
          confirmAlert("warning", "권한이 없습니다.");
        }
        if (e.response?.status === 404) {
          confirmAlert("warning", "존재하지 않는 게시글입니다.");
        }
      }
    },
  });

  const deletePost = () => {
    mutation.mutate({ postId });
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  const { title, writer, createAt, viewCount, content, isAnnouncement } =
    postDetail;

  return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.categoryArea}>
            <PageTitle pageName={detailTitle}/>
          </div>
          <ul className={styles.titleArea}>
            {AccessToken && JwtDecoder(AccessToken).role === "ROLE_MASTER" ? (
                <div className={styles.adminWrapper}>
              <span
                  className={styles.adminEdit}
                  onClick={() =>
                      navigate(
                          `/post/${category}/${postId}/update?isAnnouncement=${isAnnouncement}`
                      )
                  }
              >
                수정하기
              </span>
                  <span
                      className={styles.adminDelete}
                      onClick={() => {
                        confirmDelete(
                            "삭제",
                            deletePost,
                            "question",
                            "정말 삭제하시겠습니까?",
                            "게시글을 삭제하면 복원할 수 없습니다."
                        );
                      }}
                  >
                삭제하기
              </span>
                </div>
            ) : null}
            <li className={styles.title}>
              <span className={styles.titleContent}>{title}</span>
            </li>
            <li className={styles.list}></li>
            {typeItems.map((item, index) => (
                <li key={index} className={styles.list}>
                  {item}
                </li>
            ))}
            <li></li>
            <li className={styles.list}>{writer}</li>
            <li className={styles.list}>{createAt}</li>
            <li className={styles.list}>{viewCount}</li>
          </ul>
          {/* ------ 에디터 콘텐츠 화면 ------ */}
          <div
              id="editor-content"
              className={"ck-content " + styles.content}
              dangerouslySetInnerHTML={{__html: content}}
          />
          <div className={styles.filesWrapper}>
            <div className={styles.filesContainer}>
              <div className={styles.filesContainerTitle}>
                <span>첨부파일</span>
              </div>
              <div className={styles.downloadUrlWrapper}>
                {
                  postDetail?.files.length > 0
                      ?
                      postDetail?.files?.map((item: { fileId: number; fileName: string; fileUrl: string }) => (
                          <a
                              key={item.fileId}
                              href={item.fileUrl}
                              className={styles.fileDownloadItem}
                          >
                            {item.fileName}
                          </a>
                      ))
                      :
                      <span className={styles.fileNull}>첨부파일 없음</span>
                }
              </div>
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => navigate(`/post/${category}`)}>목록</Button>
        </div>
      </div>
  );
};
