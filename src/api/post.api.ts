import axios from "./axios";
import type { Post } from "../types/Post";

export const getAllPostsRequest = () => axios.get("/posts");

export const createPostRequest = (post: Post) => axios.post("/post", post);

export const deletePostRequest = (id: number) => axios.delete(`/posts/${id}`);

export const getPostForIdRequest = (id: number) => axios.get(`/posts/${id}`);

export const editPostRequest = (id: number, post: Post) => axios.put(`/tasks/${id}`, post);