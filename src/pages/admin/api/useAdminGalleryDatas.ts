import { useQuery } from "@tanstack/react-query";
import { Api } from "shared/api";

type useAdminGalleryDataProps = {
  page: number;
  galleryListLength: any;
};

export const useAdminGalleryDatas = ({
  page,
  galleryListLength,
}: useAdminGalleryDataProps) => {
  return useQuery({
    queryKey: ["adminGallery"],
    queryFn: () =>
      Api.get("v1/api/gallery/manage", {
        params: {
          page: page - 1,
          size: galleryListLength,         
        },
      }),
  });
};

