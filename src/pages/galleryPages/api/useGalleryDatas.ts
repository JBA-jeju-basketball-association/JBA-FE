import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { NormalApi } from "shared/api";

type useGalleryDataProps = {
  page: number;
  searchKeyword: string;
};

export const useGalleryDatas = ({
  page,
  searchKeyword,
}: useGalleryDataProps) => {
  return useQuery({
    queryKey: ["galleries", page],
    queryFn: () =>
      NormalApi.get(`/v1/api/gallery`, {
        params: {
          page: page - 1,
          size: 9,
          official: false,
          keyword: searchKeyword,
        },
      }),
    placeholderData: keepPreviousData,
  });
};
