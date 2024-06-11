import React from "react";
import { PostListRow } from "./PostListRow";
import { Post } from "../../../shared/type/PostType";
import styles from "./PostListTable.module.css";

const PostListTable = ({ postListData }: { postListData?: Post[] }) => {
  const itemTypeList = ["No", "제목", "등록자", "등록일", "조회수"];
  return (
    <div className={styles.container}>
      <ul className={styles.itemTypeList}>
        {itemTypeList.map((item, index) => (
          <li key={index} className={styles.itemType}>{item}</li>
        ))}
      </ul>
      {postListData?.map((postItem) => (
        <PostListRow key={postItem.postId} postItem={postItem} />
      ))}
    </div>
  );
};

export { PostListTable };
