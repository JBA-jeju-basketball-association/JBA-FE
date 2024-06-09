import React from "react";
import { Post } from "../../../shared/type/PostType";
import { useNavigate } from "react-router-dom";

const PostListRow = ({ postItem }: { postItem: Post }) => {
  const { postId, isAnnouncement, title, writer, createAt, viewCount } =
    postItem;
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate(`${postId}`);
        }}
      >
        <span>{postId}</span>
        <span>{isAnnouncement}</span>
        <span>{title}</span>
        <span>{writer}</span>
        <span>{createAt}</span>
        <span>{viewCount}</span>
      </div>
    </>
  );
};

export { PostListRow };
