import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

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

export const useAdminCompetitionTotal = () => {
  return useQuery({
    queryKey: ["adminCompotitionTotal"],
    queryFn: () =>
      Api.get("/v1/api/competition/admin/total-competition-and-division-list"),
  });
};
