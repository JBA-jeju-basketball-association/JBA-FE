import React from "react";
import { Post } from "../../../shared/type/PostType";
import { useNavigate } from "react-router-dom";
import styles from "./PostListRow.module.css";
import NoticeCard from "./NoticeCard";

const PostListRow = ({ postItem }: { postItem: Post }) => {
  const {
    postId,
    isAnnouncement,
    title,
    writer,
    createAt,
    viewCount,
    foreword,
  } = postItem;
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`${postId}`);
      }}
    >
      <div className={styles.postList}>
        <NoticeCard isAnnouncement={isAnnouncement} postId={postId} />
        <div className={styles.postTitle}>
          {!!foreword ? `[${foreword}]` : ""} {title}
        </div>
        <div className={styles.postWriter}>{writer}</div>
        <div className={styles.postItem}>{createAt}</div>
        <div className={styles.postItem}>{viewCount}</div>
      </div>
    </div>
  );
};

export { PostListRow };
