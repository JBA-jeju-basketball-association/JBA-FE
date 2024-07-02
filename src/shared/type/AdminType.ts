//카테고리 타입
export type Category = {
  list: string | number;
};

export type CategoryProps = {
  categories: Category[];
  selectedCategory: Category;
  setSelectedCategory: any;
};

//검색 폼 타입

export type AdminBasicFormProps = {
  categories: Category[];
  label: string;
  selectedCategory: Category;
  setSelectedCategory: any;
  showInput?: boolean;
  searchKeyword?: string;
  setSearchKeyword?: any;
  // startDate: Date | null;
  // endDate: Date | null;
  // setStartDate?: any;
  // setEndDate?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AdminSearchFormProps = {
  selectedfirstCategory: Category;
  setSelectedfirstCategory: any;
  selectedSecondCategory: Category;
  setSelectedSecondCategory?: any;
  searchKeyword: string;
  setSearchKeyword: any;
  startDate: Date | null;
  endDate: Date | null;
  setStartDate?: any;
  setEndDate?: any;
  refetch: () => void;
  label: string[];
};

type titlesType = {
  titles: string[];
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

export type AdminGalleryListProps = titlesType & {
  lists: GalleryListsType[];
};

// 관리자페이지 포스트 리스트 타입들
export type PostListsType = {
  category: string;
  content: string;
  createAt: string;
  deleteAt: string | null;
  email: string;
  files: File[];
  foreword: string | null;
  isAnnouncement: boolean;
  postId: number;
  postStatus: string;
  thumbnail: string | null;
  title: string;
  updateAt: string | null;
};
export type AdminPostListProps = titlesType & {
  lists: PostListsType[];
};
