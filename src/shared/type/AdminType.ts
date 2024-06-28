export type Category = {
  list: string;
};
export type CategoryProps = {
  categories?: Category[];
  selectedCategory?: Category;
  setSelectedCategory?: (category: Category) => void;
};

export type AdminBasicFormProps = CategoryProps & {
  label: string;
  showCategory?: boolean;
};

export type AdminSearchFormProps = {
  label: string[];
  categories: Category[][];
};


// 관리자페이지 갤러리 리스트 타입들
export type File = {
  fileId: number;
  fileName: string;
  fileUrl: string;
};

export type GalleryListsType = {
  galleryId: number;
  email: string;
  isOfficial: boolean;
  thumbnail: string;
  title: string;
  files: File[];
  galleryStatus: string;
  createAt: string;
  updateAt: string;
  deleteAt: string;
};

export type AdminListProps = {
  titles: string[];
  lists: GalleryListsType[];
};

