import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";
import { useFormattedDate } from "shared/hook/useFormattedDate";

type useAdminPostDataProps = {
  page: number;
  postListLength: number;
  secondCategory?: any;
  firstCategory?: any;
  searchKeyword: string;
  startDate: Date | null;
  endDate: Date | null;
};
//포스트 조회

export const useAdminPostDatas = (
  params: useAdminPostDataProps,
  enabled: boolean
) => {
  const firCategoryKeyMap: { [key: string]: string | null } = {
    전체: null,
    제목: "title",
    "유저 이메일": "email",
    "게시물 아이디": "id",
  };

  const secCategoryKeyMap: { [key: string]: string | null } = {
    전체: null,
    공지사항: "notice",
    자료실: "library",
    News: "news",
  };

  const firCategory = firCategoryKeyMap[params.firstCategory || null];
  const secCategory = secCategoryKeyMap[params.secondCategory || null];

  // startDate와 endDate가 존재하면 ISO 문자열로 변환 후 시간 부분을 제거하여 사용
  const formattedStartDate = useFormattedDate(params.startDate);
  const formattedEndDate = useFormattedDate(params.endDate);

  return useQuery({
    queryKey: ["adminPost", params],
    queryFn: () =>
      Api.get("v1/api/post/manage", {
        params: {
          page: params.page - 1,
          size: params.postListLength,
          category: secCategory,
          searchCriteriaString: firCategory,
          keyword: params.searchKeyword || null,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      }),
    enabled,
  });
};

//포스트 삭제
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

//포스트 공지 바꾸기
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
