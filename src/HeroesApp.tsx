import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { router } from "./router/app.router";

const queryClient = new QueryClient();

export const HeroesApp = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        {/* RouterProvider es para gestionar las rutas de la aplicación */}
        <RouterProvider router={router} />

        <ReactQueryDevtools initialIsOpen={true} />
      </QueryClientProvider>
    </>
  );
};
