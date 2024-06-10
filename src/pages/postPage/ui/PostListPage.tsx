import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PostListTable } from "../../../entities/postListTable";
import { Pagination } from "widgets/pagination";
import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { PostListData } from "../../../shared/type/PostType";
import styles from "./PostListPage.module.css";

export const PostListPage = () => {
  const [page, setPage] = useState<number>(1);
  let { category } = useParams();
  category = category as string;
  const title =
    category === "notice"
      ? "공지사항"
      : category === "news"
        ? "NEWS"
        : category === "news"
          ? "자료실"
          : "";

  const { data: postList } = useQuery<PostListData>({
    queryKey: ["postList", page],
    queryFn: () =>
      NormalApi.get(`/v1/api/post/${category}?page=${page - 1}&size=10`),
    select: (result: any) => result.data.data,
  });

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.titleArea}>
        <span className={styles.title}>{`${title}`}</span>
        </div>
        <PostListTable postListData={postList} />
        {postList && (
          <Pagination
            totalPages={Math.max(1, postList?.totalPages)}
            page={page}
            setPage={setPage}
          />
        )}
        <div>검색바</div>
      </div>
    </div>
  );
};
