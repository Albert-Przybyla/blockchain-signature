import { createBrowserRouter, Navigate } from "react-router-dom";
import AnonymousLayout from "./layouts/AnonymousLayout";
import MainLayout from "./layouts/MainLayout";
import LoginPage from "./pages/anonymous/LoginPage";
import HomePage from "./pages/app/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AnonymousLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/app",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/app/home" />,
      },
      {
        path: "home",
        element: <HomePage />,
        handle: { title: "HOME", backPath: null },
      },
    ],
  },
]);
export default router;
