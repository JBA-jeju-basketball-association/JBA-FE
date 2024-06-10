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
