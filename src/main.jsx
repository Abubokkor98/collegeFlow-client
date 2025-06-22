import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AllRoutes from "./routes/Routes.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <AllRoutes />
        <Toaster position="top-center" reverseOrder={false} />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
