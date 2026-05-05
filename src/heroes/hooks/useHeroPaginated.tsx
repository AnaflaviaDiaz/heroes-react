import { useQuery } from "@tanstack/react-query";
import { getHeroesByPageAction } from "../actions/get-heroes-by-page.action";

export const useHeroPaginated = (
  page: number,
  limit: number,
  category = "all",
) => {
  return useQuery({
    // si va a haber algo de los datos que puede cambiar, es mejor que el key se componga con un
    // objeto que lleve la pagina y el limite
    queryKey: ["heroes", { page, limit, category }], // espacio en memoria para guardar el resultado de la peticion,
    //funcion para disparar cuando eso suceda
    queryFn: () => getHeroesByPageAction(page, limit, category),
    // cuanto tiempo va a considerar que la peticion es fresca
    staleTime: 1000 * 60 * 5, // 5min
  });
};
