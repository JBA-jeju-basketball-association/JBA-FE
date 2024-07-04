import React from "react";
import styles from "./NoticeCard.module.css";

interface NoticeCardType {
  isAnnouncement: boolean;
  postId: number;
}

const NoticeCard = ({ isAnnouncement, postId }: NoticeCardType) => {
  return (
    <div className={styles.noticeWrapper}>
      {isAnnouncement ? (
        <div className={styles.noticeItem}>공지</div>
      ) : (
        <div className={styles.postItem}>{postId}</div>
      )}
    </div>
  );
};

export default NoticeCard;
