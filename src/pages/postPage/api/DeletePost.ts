import { NormalApi } from "shared/api";

export const DeletePost = ({ postId }: { postId?: string }) => {
  return NormalApi.delete(`v1/api/post/${postId}`);
};
