import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";
import { useFormattedDate } from "shared/hook/useFormattedDate";

type useAdminGalleryDataProps = {
  page: number;
  galleryListLength: any;
  secondCategory?: any;
  firstCategory?: any;
  searchKeyword: string;
  startDate: Date | null;
  endDate: Date | null;
};

export const useAdminGalleryDatas = (
  params: useAdminGalleryDataProps,
  enabled: boolean
) => {
  const firCategoryKeyMap: { [key: string]: string | null } = {
    전체: null,
    제목: "title",
    "유저 이메일": "email",
    "갤러리 아이디": "id",
  };

  const secCategoryKeyMap: { [key: string]: boolean | null } = {
    전체: null,
    스태프: true,
    일반: false,
  };

  const firCategory = firCategoryKeyMap[params.firstCategory || null];
  const secCategory = secCategoryKeyMap[params.secondCategory || null];

  const formattedStartDate = useFormattedDate(params.startDate);
  const formattedEndDate = useFormattedDate(params.endDate);
  return useQuery({
    queryKey: ["adminGallery", params],
    queryFn: () =>
      Api.get("v1/api/gallery/manage", {
        params: {
          page: params.page - 1,
          size: params.galleryListLength,
          official: secCategory,
          searchCriteriaString: firCategory,
          keyword: params.searchKeyword || null,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        },
      }),
    enabled,
    select: (res: any) => res.data.data,
  });
};

export const useAdminGalleryCsv = (enabled: boolean) => {
  return useQuery({
    queryKey: ["galleryCsvData"],
    queryFn: () =>
      Api.get("v1/api/gallery/manage", {
        params: {
          size: 100000,
        },
      }),
    enabled,
  });
};
