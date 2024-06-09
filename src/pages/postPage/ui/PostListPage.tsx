import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FetchPostList } from "../api/FetchPostList";
import { PostListTable } from "../../../entities/postListTable";

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
  const { postList } = FetchPostList({ category, page });
  return (
    <>
      <span>페이지: {`${title}`}</span>
      <PostListTable postListData={postList?.data} />
      <div>페이지네이션</div>
      <div>검색바</div>
    </>
  );
};
