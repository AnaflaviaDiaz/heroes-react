import { RouterProvider } from "react-router";
import { router } from "./router/app.router";

export const HeroesApp = () => {
  return (
    <>
      {/* RouterProvider es para gestionar las rutas de la aplicación */}
      <RouterProvider router={router} />
    </>
  );
};
