import React from "react";
import { useParams } from "react-router-dom";

export const PostListPage = () => {
  const { category } = useParams();

  return (
    <div>
      <div>{`${category}`}페이지 입니다.</div>
      <div>표</div>
      <div>페이지네이션</div>
      <div>검색바</div>
    </div>
  );
};
