import React from "react";
import styles from "./AdminPostListData.module.css";
import Button from "shared/ui/button";
import { AdminPostListProps, PostListsType } from "shared/type/AdminType";
import {
  useAdminPostDelete,
  useAdminchangeAnnouncement,
} from "pages/admin/api/useAdminPostDatas";
import confirmAndCancelAlertWithLoading from "shared/lib/alert/ConfirmAndCancelAlertWithLoading";
import { useTruncateString } from "shared/hook/useTruncateString";

export const AdminPostListData = ({ titles, lists }: AdminPostListProps) => {
  const { mutate: changeAnnouncement } = useAdminchangeAnnouncement();
  const { mutate: deletePost } = useAdminPostDelete();

  const isAnnouncement = (isAnnouncement: boolean) =>
    isAnnouncement ? "공지" : "공지 안함";

  //isAnnouncement = true면 공지, false면 공지안함

  const truncateString = useTruncateString();

  const handleNavigateToDetailPage = (postId: number, category: string) => {
    window.open(`/post/${category}/${postId}`);
  };
  //상세페이지 이동

  const handleNavigateToEditPage = (postId: number, category: string) => {
    window.open(`/post/${category}/${postId}/update`);
  };
  //수정페이지 이동

  const handleDeleteClick = (postId: number) => {
    confirmAndCancelAlertWithLoading(
      "warning",
      "정말 삭제하시겠습니까?",
      "",
      async () => {
        if (postId) deletePost(postId);
      }
    );
  };
  //삭제

  const changeAnnouncementClick = (postId: number) => {
    const post = lists.find((list) => list.postId === postId);
    if (!post) return;

    confirmAndCancelAlertWithLoading(
      "warning",
      "",
      post.isAnnouncement
        ? "공지를 해제하시겠습니까?"
        : "공지로 변경하시겠습니까?",
      async () => {
        changeAnnouncement(postId);
      }
    );
  };
  //공지로 변경-해제

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        {titles.map((title, index) => (
          <h1 key={index}>{title}</h1>
        ))}
      </div>
      <div className={styles.contentWrapper}>
        {lists?.map((list: PostListsType) => (
          <div key={list.postId} className={styles.listWrapper}>
            <span>{list.postId}</span>
            <span>{list.email}</span>
            <span className={styles.btn}>
              <Button
                className={styles.updateBtn}
                onClick={() =>
                  handleNavigateToEditPage(list.postId, list.category)
                }
              >
                수정
              </Button>
              <Button
                className={styles.deleteBtn}
                onClick={() => handleDeleteClick(list.postId)}
              >
                삭제
              </Button>
            </span>
            <span>{list.category}</span>
            <span>
              {list.thumbnail ? (
                <img
                  src={list.thumbnail}
                  alt="thumbnail"
                  className={styles.listImg}
                />
              ) : (
                "없음"
              )}
            </span>
            <span
              className={styles.titleSpan}
              onClick={() =>
                handleNavigateToDetailPage(list.postId, list.category)
              }
            >
              {list.title}
            </span>
            <span>{truncateString(list.content, 10)}</span>
            <span className={styles.file}>
              {list.files?.length > 0
                ? list.files.map((file, index) => (
                    <a
                      key={index}
                      href={file.fileUrl}
                      download={file.fileName}
                      rel="noreferrer"
                    >
                      {truncateString(file.fileName, 10)}
                    </a>
                  ))
                : "첨부파일 없음"}
            </span>
            <span>{list.postStatus}</span>
            <span>
              <button
                className={`${list.isAnnouncement ? styles.announcementBtn : styles.notAnnouncementBtn}`}
                onClick={() => changeAnnouncementClick(list.postId)}
              >
                {isAnnouncement(list.isAnnouncement)}
              </button>
            </span>
            <span>{list.createAt}</span>
            <span>{list.updateAt || "없음"}</span>
            <span>{list.deleteAt || "없음"}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
