import axios, { AxiosResponse } from "axios";
import { NormalApi } from "shared/api/NormalApi";

export default function fetchGetCompetitionList(
  statusFocused: string,
  year: string,
  page: number,
  pageSize: number
): Promise<AxiosResponse<any, any>> {
  return NormalApi.get(
    `v1/api/competition/competition?status=${statusFocused}&year=${year}&page=${page - 1}&size=${pageSize}`
  );
}
