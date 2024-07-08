import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";
import confirmAlert from "shared/lib/ConfirmAlert";
import { useFormattedDate } from "shared/hook/useFormattedDate";

type useAdminUserDataProps = {
  page: number;
  userListLength: number;
  firstCategory?: any;
  searchKeyword: string;
  secondCategory?: any;
  startDate: Date | null;
  endDate: Date | null;
};

export const useAdminUserDatas = (
  params: useAdminUserDataProps,
  enabled: boolean
) => {
  const firCategoryKeyMap: { [key: string]: string | null } = {
    전체: null,
    이름: "name",
    이메일: "email",
    아이디: "id",
    소속팀: "team",
  };

  const secCategoryKeyMap: { [key: string]: string | null } = {
    전체: null,
    마스터: "master",
    관리자: "admin",
    유저: "user",
    심판부: "referee",
    "심판 이사": "referee-leader",
    경기부: "table-official",
    "경기부 이사": "table-official-leader",
  };

  const firCategory = firCategoryKeyMap[params.firstCategory || null];
  const secCategory = secCategoryKeyMap[params.secondCategory || null];

  const formattedStartDate = useFormattedDate(params.startDate);
  const formattedEndDate = useFormattedDate(params.endDate);

  return useQuery({
    queryKey: ["adminUser", params],
    queryFn: () =>
      Api.get("/v1/api/admin/user", {
        params: {
          page: params.page - 1,
          size: params.userListLength,
          searchCriteriaString: firCategory,
          keyword: params.searchKeyword || null,
          permissionsStr: secCategory,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      }),
    enabled,
  });
};
