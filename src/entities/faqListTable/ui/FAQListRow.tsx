import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./FAQListRow.module.css";
import { MockPost } from "pages/faqPage/type";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";

export const FAQListRow = ({ postItem }: { postItem: MockPost }) => {
  const { postId, title, content, writer, createAt } = postItem;
  const navigate = useNavigate();
  const [toggle, setToggle] = useState<boolean>(false);
  return (
      <div
          className={styles.container}
      >
        <div className={styles.post_row_wrapper}>
          <span className={styles.postQ}>Q</span>
          <div className={styles.postTitle} onClick={() => setToggle(!toggle)}>{title}</div>
          {toggle ?
              <IoIosArrowUp className={styles.postArrow} onClick={() => setToggle(!toggle)}/>
              :
              <IoIosArrowDown className={styles.postArrow} onClick={() => setToggle(!toggle)}/>
          }
        </div>
        {toggle && (
            <div className={styles.post_answer}>
              <span className={styles.postA}>A</span>
              <div className={styles.postContent}>{content}</div>
              <div></div>
            </div>
        )}
      </div>
  );
};
