import { CustomMenu } from "@/components/custom/CustomMenu";
import { Outlet } from "react-router";

// Este componente es para reutilizar estilos y lógica común entre las páginas de héroes,
// como el home, el search y el hero page
export const HeroesLayout = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto p-6">
          <CustomMenu />
          <Outlet />
        </div>
      </div>
    </>
  );
};
