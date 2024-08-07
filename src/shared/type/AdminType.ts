//카테고리 타입
export type Category = {
  list: string | number;
};

export type CategoryProps = {
  categories?: Category[];
  selectedCategory: Category;
  setSelectedCategory: any;
};

//검색 폼 타입

export type AdminBasicFormProps = {
  categories?: Category[];
  label: string;
  selectedCategory: Category;
  setSelectedCategory: any;
  showInput?: boolean;
  searchKeyword?: string;
  setSearchKeyword?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export type AdminSearchFormProps = {
  firstCategoryOptions: Category[];
  secondCategoryOptions: Category[];
  label: string[];
  selectedfirstCategory: Category;
  selectedSecondCategory: Category;
  searchKeyword: string;
  startDate: Date | null;
  endDate: Date | null;
  setSelectedfirstCategory: (category: string) => void;
  setSelectedSecondCategory: (category: string) => void;
  setSearchKeyword: (keyword: string) => void;
  setStartDate: any;
  setEndDate: any;
  handleSearch: () => void;
  handleReset: () => void;
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

//관리자페이지 유저리스트 타입들

export type UserListsType = {
  createAt: string;
  dateOfBirth: string;
  deleteAt: string | null;
  email: string;
  failureCount: number;
  gender: string;
  lockAt: string | null;
  loginAt: string | null;
  name: string;
  permission: string;
  phoneNum: string;
  team: string;
  updateAt: string | null;
  userId: number;
  userStatus: string;
};

export type AdminUserListProps = titlesType & {
  lists: UserListsType[];
};

//관리자페이지 대회 타입들

export type competitionFile = {
  competitionAttachedFileId: number;
  fileName: string;
  filePath: string;
};

export type divisionType = {};

export type CompetitionListsType = {
  competitionId: string;
  userEmail: string;
  situation: string;
  divisions: any;
  //divisions 수정하기
  competitionName: string;
  startDate: string | null;
  endDate: string | null;
  content: string;
  link: string | undefined;
  files: competitionFile[];
  status: string;
  createAt: string;
  updateAt: string | null;
  deleteAt: string | null;

  phase: string;
};

export type AdminCompetitionListProps = titlesType & {
  lists: CompetitionListsType[];
};
