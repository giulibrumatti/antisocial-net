import axios from "./axios";
import type { Post, Comment } from "../types/Post";

export const getAllPostsRequest = () => axios.get("/posts");

export const createPostRequest = (post: Post) => axios.post("/post", post);

export const deletePostRequest = (id: number) => axios.delete(`/posts/${id}`);

export const getPostForIdRequest = (id: number) => axios.get(`/posts/${id}`);

export const editPostRequest = (id: number, post: Post) =>
  axios.put(`/tasks/${id}`, post);

// FUNCIONES PARA COMENTARIOS
export const createCommentRequest = (postId: number, content: string) =>
  axios.post(`/posts/${postId}/comments`, { content });

export const editCommentRequest = (
  postId: number,
  commentId: number,
  content: string
) => axios.put(`/posts/${postId}/comments/${commentId}`, { content });

export const deleteCommentRequest = (postId: number, commentId: number) =>
  axios.delete(`/posts/${postId}/comments/${commentId}`);

// 👉 Nueva función para obtener comentarios de un post específico
export const getCommentsForPostRequest = (postId: number) =>
  axios.get<Comment[]>(`/posts/${postId}/comments`);
