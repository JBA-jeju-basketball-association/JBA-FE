import React from "react";
import styles from "./FAQListTable.module.css";
import { FAQListRow } from "./FAQListRow";
import { MockDataType } from "pages/faqPage/type";

export const FAQListTable = ({ mockData }: { mockData: MockDataType }) => {
  return (
    <div className={styles.container}>
      {mockData.posts.length ? (
        mockData.posts.map((item) => (
          <FAQListRow key={item.postId} postItem={item} />
        ))
      ) : (
        <div>게시글이 존재 하지 않습니다.</div>
      )}
    </div>
  );
};
