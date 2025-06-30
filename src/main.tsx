import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostProvider } from "./context/PostContext.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PostProvider>
          <App />
        </PostProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
