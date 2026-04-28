import { createBrowserRouter } from "react-router";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { AdminPage } from "@/admin/pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: '/hero/1',
    element: <HeroPage />,
  },
  {
    path: '/search',
    element: <SearchPage />,
  },
  {
    path: '/admin',
    element: <AdminPage />
  }
])