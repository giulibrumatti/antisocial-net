export interface Post {
  id: number;
  title: string;
  body: string;
}

export interface PostContextType {
  posts: Post[];
  loadPosts: () => Promise<void>; 
  deletePost: (id: number) => Promise<void>;
  createPost: (post: Post) => Promise<Post | undefined>;
  loadPost: (id: number) => Promise<Post>;
  updatePost: (id: number, post: Post) => Promise<Post | undefined>;
  errors: string[];
}