import { Api } from "shared/api";

export const DeletePost = ({ postId }: { postId?: string }) => {
  return Api.delete(`v1/api/post/${postId}`);
};
