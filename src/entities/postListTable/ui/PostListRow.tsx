import React from "react";
import { Post } from "../../../shared/type/PostType";
import { useNavigate } from "react-router-dom";
import styles from "./PostListRow.module.css";

const PostListRow = ({ postItem }: { postItem: Post }) => {
  const { postId, isAnnouncement, title, writer, createAt, viewCount, foreword } =
    postItem;
  const navigate = useNavigate();
  return (
    <div
      className={styles.container}
      onClick={() => {
        navigate(`${postId}`);
      }}
    >
        <ul className={styles.postList}>
          <li className={styles.postItem}>{isAnnouncement ? '공지' : postId}</li>
          <li className={styles.postItem}>{!!foreword ? `[${foreword}]` : ''} {title}</li>
          <li className={styles.postWriter}>{writer}</li>
          <li className={styles.postItem}>{createAt}</li>
          <li className={styles.postItem}>{viewCount}</li>
        </ul>
    </div>
  );
};

export { PostListRow };
