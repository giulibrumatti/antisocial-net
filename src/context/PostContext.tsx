import { useState } from "react";
import type { ReactNode } from "react";
import type { Post } from "../types/Post";
import { useAuth } from "./AuthContext";
import { PostContext } from "./PostContextDef";
import type { PostContextType } from "./PostContextDef";


export const PostProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = async () => {
    try {
      setLoading(true);

      const mockPosts: Post[] = [
        {
          id: 1,
          description: "¡Bienvenidos a AntiSocial Net! Esta es mi primera publicación.",
          User: {
            id: 1,
            nickName: "admin",
            avatar: undefined,
          },
          comments: [],
          likes: 5,
          createdAt: new Date().toISOString(),
        },
        {
          id: 2,
          description: "Probando la funcionalidad de comentarios y likes.",
          User: {
            id: 2,
            nickName: "usuario_test",
            avatar: undefined,
          },
          comments: [
            {
              id: 1,
              content: "¡Excelente funcionalidad!",
              userId: 1,
              User: {
                id: 1,
                nickName: "admin",
                avatar: undefined,
              },
              createdAt: new Date().toISOString(),
            },
          ],
          likes: 3,
          createdAt: new Date().toISOString(),
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPosts(mockPosts);
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  };

const addComment = async (postId: number, content: string) => {
  if (!user) {
    console.warn("No hay usuario logueado para agregar comentario.");
    return;
  }

  const newComment: import("../types/Post").Comment = {
    id: Date.now(),
    content,
    userId: user.id ?? 0,
    User: {
      id: user.id ?? 0,
      nickName: user.nickName,
      avatar: user.avatar,
    },
    createdAt: new Date().toISOString(),
  };

  setPosts((prevPosts: Post[]) =>
    prevPosts.map((post) => {
      if (post.id !== postId) return post;

      const updatedPost: Post = {
        ...post,
        comments: [...(post.comments ?? []), newComment],
      };

      return updatedPost;
    })
  );
};

  const deleteComment = async (postId: number, commentId: number) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;

        return {
          ...post,
          comments: (post.comments ?? []).filter(
            (comment) => comment.id !== commentId
          ),
        };
      })
    );
  };

  const editComment = async (postId: number, commentId: number, content: string) => {
    setPosts((prevPosts: Post[]) =>
      prevPosts.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          comments: (post.comments ?? []).map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment
          ),
        };
      })
    );
  };

  const value: PostContextType = {
    posts,
    loading,
    loadPosts,
    addComment,
    editComment,
    deleteComment,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};

// usePost hook moved to a separate file (usePost.ts)
