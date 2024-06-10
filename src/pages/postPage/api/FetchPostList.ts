import { useQuery } from "@tanstack/react-query";
import { NormalApi } from "../../../shared/api/NormalApi";
import { PostDataResponse } from "../../../shared/type/PostType";

interface FetchPostListType {
  category: string;
  page: number;
}

export const FetchPostList = ({ category, page }: FetchPostListType) => {
  const { data: postList } = useQuery<PostDataResponse>({
    queryKey: ["postList", category],
    queryFn: () =>
      NormalApi.get(`/v1/api/post/${category}?page=${page - 1}&size=10`),
  });
};
