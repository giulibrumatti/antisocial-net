export interface User {
  id: number;
  nickName: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
}

export interface Comment {
  id: number;
  content: string;
  userId: number;
  User: {
    nickName: string;
    id: number;
    avatar?: string;
  };
  createdAt: string;
  updatedAt?: string;
}

export interface Post {
  id: number;
  description: string;
  imageUrl?: string;
  User: {
    id: number;
    nickName: string;
    avatar?: string;
  };
  comments?: Comment[];
  likes?: number;
  createdAt: string;
  updatedAt?: string;
  tags?: string;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
}

export interface PostFormData {
  description: string;
  imageUrl?: string;
}

export interface CommentFormData {
  content: string;
  postId: number;
}