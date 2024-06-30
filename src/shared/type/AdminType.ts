export type Category = {
  list: string | number;
};

export type CategoryProps = {
  categories: Category[];
  selectedCategory: Category;
  setSelectedCategory: any;
};
////////////////////////////////////////

export type AdminBasicFormProps = CategoryProps & {
  categories: Category;
  label: string;
  selectedCategory: any;
  setSelectedCategory: any;
  showCategory: boolean;
  value: string;
  onChange: any;
};

export type AdminSearchFormProps = {
  gallerySearchCriteria: Category[];
  label: string[];
  showCategory: boolean;
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
