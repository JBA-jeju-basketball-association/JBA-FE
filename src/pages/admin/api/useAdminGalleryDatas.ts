import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

type useAdminGalleryDataProps = {
  page: number;
};

export const useAdminGalleryDatas = ({ page }: useAdminGalleryDataProps) => {
  return useQuery({
    queryKey: ["adminGallery"],
    queryFn: () =>
      Api.get("v1/api/gallery/manage", {
        params: {
          page: page - 1,
          size: 20,
          // searchCriteriaString: false,
        },
      }),
  });
};

//searchCriteriaString는 카테고리 검색을 위한 문자열
