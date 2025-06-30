import { createContext, useContext, useState } from "react";
import type { PostContextType, Post } from "../types/Post";
import type { ReactNode } from "react";
import {
  getAllPostsRequest,
  createPostRequest,
  deletePostRequest,
  getPostForIdRequest,
  editPostRequest,
} from "../api/post.api";

import axios from "axios";

export const PostContext = createContext<PostContextType | null>(null);

export const usePost = (): PostContextType => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePost must be used within a PostProvider");
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

export function PostProvider({ children }: PostProviderProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const loadPosts = async () => {
    const res = await getAllPostsRequest();
    setPosts(res.data);
  };

  const loadPost = async (id: number) => {
    const res = await getPostForIdRequest(id);
    return res.data;
  };

  const createPost = async (post: Post): Promise<Post | undefined> => {
    try {
      const res = await createPostRequest(post);
      setPosts([...posts, res.data]);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const updatePost = async (id: number, post: Post) => {
    try {
      const res = await editPostRequest(id, post);
      return res.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        setErrors([error.response.data.message]);
      }
    }
  };

  const deletePost = async (id: number) => {
    const res = await deletePostRequest(id);
    if (res.status === 204) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        loadPosts,
        deletePost,
        createPost,
        loadPost,
        errors,
        updatePost,
      }}
    >
      {children}
    </PostContext.Provider>
  );
}