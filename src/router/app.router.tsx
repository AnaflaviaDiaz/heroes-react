import { createBrowserRouter } from "react-router";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { AdminLayout } from "@/admin/layout/AdminLayout";
import { lazy } from "react";

// eslint-disable-next-line react-refresh/only-export-components
const SearchPage = lazy(() =>
  import("@/heroes/pages/search/SearchPage").then((module) => ({
    default: module.SearchPage,
  })),
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HeroesLayout />,
    children: [
      {
        // path: "", esto o index: true, es lo mismo, es para indicar que esta ruta es la raíz del layout
        index: true,
        element: <HomePage />,
      },
      {
        path: "heroes/:id",
        element: <HeroPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "*",
    element: <h1>404</h1>,
  },
]);
