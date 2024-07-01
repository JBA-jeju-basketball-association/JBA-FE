import React from "react";
import styles from "./AdminPostListData.module.css";
import Button from "shared/ui/button";
import { useNavigate } from "react-router-dom";
import confirmAlert from "shared/lib/ConfirmAlert";
import { AdminPostListProps, PostListsType } from "shared/type/AdminType";
import {
  useAdminPostDelete,
  useAdminchangeAnnouncement,
} from "pages/admin/api/useAdminPostDatas";
import { useFileDownload } from "shared/hook/useFileDownload";

export const AdminPostListData = ({ titles, lists }: AdminPostListProps) => {
  const { mutate: changeAnnouncement } = useAdminchangeAnnouncement();
  const { mutate: deletePost } = useAdminPostDelete();

  const navigate = useNavigate();

  const isAnnouncement = (isAnnouncement: boolean) =>
    isAnnouncement ? "공지" : "공지 안함";

  //isAnnouncement = true면 공지, false면 공지안함

  const content = (content: string) =>
    content.length > 10 ? `${content.slice(0, 10)}...` : content;

  //content가 10자 이상이면 10자까지만 보여주고 나머지는 ...으로 표시

  const handleNavigateToDetailPage = (postId: number, category: string) => {
    navigate(`/post/${category}/${postId}`);
  };
  //상세페이지 이동

  const handleNavigateToEditPage = (postId: number, category: string) => {
    navigate(`/post/${category}/${postId}/update`);
  };
  //수정페이지 이동

  const handleDeleteClick = async (postId: number) => {
    const confirm = await confirmAlert("warning", "정말 삭제하시겠습니까?");
    if (confirm) {
      deletePost(postId);
    }
  };
  //삭제

  const changeAnnouncementClick = async (postId: number) => {
    const post = lists.find((list) => list.postId === postId);
    if (!post) return;

    const confirm = await confirmAlert(
      "warning",
      post.isAnnouncement
        ? "공지를 해제하시겠습니까?"
        : "공지로 변경하시겠습니까?"
    );
    if (confirm) changeAnnouncement(postId);
  };
  //공지로 변경-해제

  const { fileDownload } = useFileDownload();
  //파일 다운로드 함수

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
                onClick={() =>
                  handleNavigateToEditPage(list.postId, list.category)
                }
              >
                수정
              </Button>
              <Button onClick={() => handleDeleteClick(list.postId)}>
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
            <span>{content(list.content)}</span>
            <span className={styles.file}>
              {list.files?.length > 0
                ? list.files.map((file, index) => (
                    <a
                      key={index}
                      onClick={(e) => {
                        e.preventDefault();
                        fileDownload(file.fileUrl, file.fileName);
                      }}
                      rel="noreferrer"
                    >
                      {file.fileName}
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
