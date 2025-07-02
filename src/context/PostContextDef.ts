import { createContext, useContext } from "react";
import type { Post } from "../types/Post";

export interface Comment {
  id: number;
  postId: number;
  userId: number;
  content: string;
  User?: {
    id: number;
    nickName: string;
    avatar?: string;
  };
  createdAt?: string;
}

export interface PostContextType {
  posts: Post[];
  loading: boolean;
  loadPosts: () => Promise<void>;
  addComment: (postId: number, content: string) => Promise<void>;
  editComment: (postId: number, commentId: number, content: string) => Promise<void>;
  deleteComment: (postId: number, commentId: number) => Promise<void>;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost debe usarse dentro de un PostProvider");
  }
  return context;
};
