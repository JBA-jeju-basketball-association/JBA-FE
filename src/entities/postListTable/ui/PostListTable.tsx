import React from "react";
import { PostListRow } from "./PostListRow";
import { Post } from "../../../shared/type/PostType";
import styles from "./PostListTable.module.css";
import {ListErrorRow} from "../../../shared/ui/listErrorRow/ListErrorRow";
type Props = {
    postListData?: Post[];
    totalPosts: number | undefined;
}
const PostListTable = ({ postListData, totalPosts }:Props ) => {
  const itemTypeList = ["No", "제목", "등록자", "등록일", "조회수"];
  return (
    <div className={styles.container}>
      <ul className={styles.itemTypeList}>
        {itemTypeList.map((item, index) => (
          <li key={index} className={styles.itemType}>{item}</li>
        ))}
      </ul>
      {totalPosts !== 0 ?
          postListData?.map((postItem) => (
              <PostListRow key={postItem.postId} postItem={postItem} />
          ))
          :
          <ListErrorRow content={"게시물이 없습니다."}/>
      }
    </div>
  );
};

export { PostListTable };
