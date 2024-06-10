import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";

export interface FetchPostDetailType {
  postId: string;
  category: string;
}

export const FetchPostDetail = ({ postId, category }: FetchPostDetailType) => {
  const { data: postDetail } = useQuery({
    queryKey: ["postDeatil"],
    queryFn: () => NormalApi.get(`/v1/api/post/${category}/${postId}`),
  });
};
