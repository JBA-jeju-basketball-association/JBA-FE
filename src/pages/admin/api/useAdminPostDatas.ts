import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";

type useAdminPostDataProps = {
  page: number;
  postListLength: any;
};

export const useAdminPostDatas = ({
  page,
  postListLength,
}: useAdminPostDataProps) => {
  return useQuery({
    queryKey: ["adminPost"],
    queryFn: () =>
      Api.get("v1/api/post/manage", {
        params: {
          page: page - 1,
          size: postListLength,
        },
      }),
  });
};

export const useAdminPostDelete = () => {
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationKey: ["adminPostDelete"],
    mutationFn: (postId: number) => Api.delete(`/v1/api/post/${postId}`),
    onSuccess: () => {
      confirmAlert("success", "삭제가 완료되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      queryClient.invalidateQueries({ queryKey: ["adminPost"] });
    },
  });

  return deletePost;
};

export const useAdminchangeAnnouncement = () => {
  const queryClient = useQueryClient();

  const changeAnnouncement = useMutation({
    mutationKey: ["adminChangeAnnouncement"],
    mutationFn: (postId: number) =>
      Api.put(`/v1/api/post/${postId}/is-announcement`),
    onSuccess: () => {
      confirmAlert("success", "공지로 변경되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["postList"] });
      queryClient.invalidateQueries({ queryKey: ["adminPost"] });
    },
  });

  return changeAnnouncement;
};
