export interface Post {
  postId: number;
  isAnnouncement: boolean;
  title: string;
  writer: string;
  createAt: string;
  viewCount: number;
  foreword: string;
}

export interface PostListData {
  totalPages: number;
  totalPosts: number;
  posts: Post[];
}

export interface PostDataResponse {
  code: number;
  message: string;
  data: PostListData;
}

// 이미지 타입 정의
export interface PostImgsType {
  fileName: string;
  imgUrl: string;
}

// 게시글 타입 정의
export interface PostDetailType {
  postId: number;
  foreword: string;
  title: string;
  writer: string;
  createAt: string;
  viewCount: number;
  files: any[]; // files가 배열인데 정확한 구조를 알 수 없으므로 any[]로 정의
  postImgs: PostImgsType[];
  content: string;
}
