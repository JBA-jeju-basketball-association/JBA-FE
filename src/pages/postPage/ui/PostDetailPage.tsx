import React from "react";
import { FetchPostDetail } from "../api/FetchPostDetail";
import { useParams } from "react-router-dom";
import { FetchPostDetailType } from "../api/FetchPostDetail";

export const PostDetailPage = () => {
  let { postId, category } = useParams();
  postId = postId as FetchPostDetailType["postId"];
  category = category as FetchPostDetailType["category"];

  const { postDetail } = FetchPostDetail({ postId, category });

  console.log(postDetail);
  return <div>포스트 디테일: {postId} 페이지 입니다.</div>;
};
