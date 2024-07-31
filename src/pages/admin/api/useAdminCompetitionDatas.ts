import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/alert/ConfirmAlert";
import { useFormattedDate } from "shared/hook/useFormattedDate";

type useAdminCompetitionDataProps = {
  page: number;
  competitionListLength: any;
  firstCategory?: any;
  searchKeyword: string;
  secondCategory?: any;
  startDate: Date | null;
  endDate: Date | null;
  selectedSecondCategory: any;
  situationList: string[];
};

export const useAdminCompetitionDatas = (
  params: useAdminCompetitionDataProps,
  enabled: boolean
) => {
  const firCategoryKeyMap: { [key: string]: string | null } = {
    대회명: "title",
    "유저 이메일": "email",
    "게시물 아이디": "id",
  };

  const firCategory = firCategoryKeyMap[params.firstCategory || null];

  // startDate와 endDate가 존재하면 ISO 문자열로 변환 후 시간 부분을 제거하여 사용
  const formattedStartDate = useFormattedDate(params.startDate);
  const formattedEndDate = useFormattedDate(params.endDate);

  return useQuery({
    queryKey: ["adminCompetition", params],
    queryFn: () =>
      Api.get("/v1/api/competition/admin/list", {
        params: {
          page: params.page - 1,
          size: params.competitionListLength,
          searchType: firCategory,
          searchKey: params.searchKeyword || null,
          division: params.selectedSecondCategory,
          filterStartDate: formattedStartDate,
          filterEndDate: formattedEndDate,
          situation: params.situationList,
        },
      }),
    enabled,
    select: (res: any) => res.data.data,
  });
};

export const useAdminCompetitionTotal = () => {
  return useQuery({
    queryKey: ["adminCompotitionTotal"],
    queryFn: () =>
      Api.get("/v1/api/competition/admin/total-competition-and-division-list"),
  });
};

export const useAdminCompetitionDelete = () => {
  const queryClient = useQueryClient();
  const deleteCompetition = useMutation({
    mutationKey: ["adminCompetitionDelete"],
    mutationFn: (competitionId: string) =>
      Api.delete(`/v1/api/competition/delete/${competitionId}`),
    onSuccess: () => {
      confirmAlert("success", "대회가 삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["adminCompetition"] });
    },
    onError: () => {
      confirmAlert("error", "대회 삭제에 실패했습니다.");
    },
  });
  return deleteCompetition;
};

export const useAdminScheduleDelete = () => {
  const queryClient = useQueryClient();
  const deleteSchedule = useMutation({
    mutationKey: ["adminScheduleDelete"],
    mutationFn: (competitionId: string) =>
      Api.delete(`/v1/api/competition/delete/schedule/${competitionId}`),
    onSuccess: () => {
      confirmAlert("success", "삭제되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["adminCompetition"] });
    },
    onError: () => {
      confirmAlert("error", "삭제에 실패했습니다.");
    },
  });
  return deleteSchedule;
};

export const useAdminCompetitionCsv = (enabled: boolean) => {
  return useQuery({
    queryKey: ["competitionCsvData"],
    queryFn: () =>
      Api.get("/v1/api/competition/admin/list", {
        params: {
          size: 100000,
        },
      }),
    enabled,
  });
};
