import React from "react";
import { PostListRow } from "./PostListRow";
import { PostListData } from "../../../shared/type/PostType";

const PostListTable = ({ postListData }: { postListData?: PostListData }) => {
  return (
    <div>
      {postListData?.posts.map((postItem) => (
        <PostListRow key={postItem.postId} postItem={postItem} />
      ))}
    </div>
  );
};

export { PostListTable };
