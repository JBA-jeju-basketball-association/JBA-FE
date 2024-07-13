import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";

type useAdminCompetitionDatas = {
  page: number;
  competitionListLength: any;
  // secondCategory?: any;
  // firstCategory?: any;
  // searchKeyword: string;
  // startDate: Date | null;
  // endDate: Date | null;
};

export const useAdminCompetitionDatas = (
  params: useAdminCompetitionDatas
  // enabled: boolean
) => {
  return useQuery({
    queryKey: ["adminCompetition"],
    queryFn: () =>
      Api.get("/v1/api/competition/admin/list", {
        params: {
          page: params.page - 1,
          size: params.competitionListLength,
        },
      }),
    // enabled,
  });
};
// searchKey 미입력 시 title
// division 미입력 시 전체
// situation 미입력 시 전체
// page 미입력 시 0
// size 미입력 시 20

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
