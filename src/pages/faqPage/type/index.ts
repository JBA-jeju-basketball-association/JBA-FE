export interface MockPost {
    postId: number;
    title: string;
    content: string;
    writer: string;
    createAt: string;
  }
  
  export interface MockDataType {
    totalPages: number;
    totalPosts: number;
    posts: MockPost[];
  }