// Modelo de usuario que puede aparecer en un comentario o post
export interface User {
  id: number;
  nickName: string;
  email?: string;
  avatar?: string;
  createdAt?: string;
}

// Modelo de un comentario
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

// Modelo de un post
export interface Post {
  id: number;
  description: string;
  imageUrl?: string;

  // Usuario que hizo el post
  User: {
    id: number;
    nickName: string;
    avatar?: string;
  };

  comments?: Comment[];

  // ✅ Agregado: soporte para etiquetas
  tags?: {
    id: number;
    name: string;
  }[];

  likes?: number;
  createdAt: string;
  updatedAt?: string;
  tags?: string;
}

// Like (opcional si no se usa en el TP)
export interface Like {
  id: number;
  userId: number;
  postId: number;
  createdAt: string;
}

// Para enviar un nuevo post
export interface PostFormData {
  description: string;
  imageUrl?: string;
}

// Para enviar un nuevo comentario
export interface CommentFormData {
  content: string;
  postId: number;
}
