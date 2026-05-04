import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
// import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/ui/SearchControl";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { getHeroesByPageAction } from "@/heroes/actions/get-heroes-by-page.action";

type TabsType = "all" | "favorites" | "villains" | "heroes";

export const HomePage = () => {
  // const [activeTab, setActiveTab] = useState<TabsType>("all");

  // queryParameters => más datos que se pondrán en la url
  const [searchParams, setSearchParams] = useSearchParams();

  const currentLimitSearchParam = searchParams.get("limit") || 6;

  const currentPageSearchParam = searchParams.get("page") || 1;

  const currentTabSearchParam = searchParams.get("tab") || "all";
  const activeTab = ["all", "favorites", "villains", "heroes"]?.includes(
    currentTabSearchParam,
  )
    ? currentTabSearchParam
    : "all";

  const { data: heroesResponse } = useQuery({
    // si va a haber algo de los datos que puede cambiar, es mejor que el key se componga con un
    // objeto que lleve la pagina y el limite
    queryKey: [
      "heroes",
      { page: currentPageSearchParam, limit: currentLimitSearchParam },
    ], // espacio en memoria para guardar el resultado de la peticion,
    queryFn: () =>
      //funcion para disparar cuando eso suceda
      getHeroesByPageAction(+currentPageSearchParam, +currentLimitSearchParam),
    // 5min, cuanto tiempo va a considerar que la peticion es fresca
    staleTime: 1000 * 60 * 5,
  });

  console.log(heroesResponse);

  // con tanStack se busca evitar usar efectos
  // useEffect(() => {
  //   getHeroesByPage().then();
  // }, [])

  const handleSetTab = (tab: TabsType) => {
    setSearchParams((prev) => {
      prev.set("tab", tab);
      return prev;
    });
  };

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Superhero Universe"
        subtitle="Discover, explore, and manage your favorite superheroes and villains"
      />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs currentPage="" />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* SearchControl */}
      <SearchControl />

      {/* Tabs */}
      <Tabs value={activeTab} className="mb-8">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => handleSetTab("all")}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => handleSetTab("favorites")}
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => handleSetTab("heroes")}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => handleSetTab("villains")}
          >
            Villains (2)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <h1>All Characters</h1>
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
        <TabsContent value="favorites">
          <h1>Favorites</h1>
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
        <TabsContent value="heroes">
          <h1>Heroes</h1>
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
        <TabsContent value="villains">
          <h1>Villains</h1>
          <HeroGrid heroes={heroesResponse?.heroes || []} />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
    </>
  );
};
