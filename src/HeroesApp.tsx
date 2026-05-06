import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./router/app.router";
import { FavoriteHeroProvider } from "./heroes/context/FavoriteHeroContext";

const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <FavoriteHeroProvider>
          {/* RouterProvider es para gestionar las rutas de la aplicación */}
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={true} />
        </FavoriteHeroProvider>
      </QueryClientProvider>
    </>
  );
};
