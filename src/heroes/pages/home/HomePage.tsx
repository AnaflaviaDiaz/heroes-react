import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/ui/SearchControl";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary";
import { useHeroPaginated } from "@/heroes/hooks/useHeroPaginated";
import { useHomePagination } from "@/heroes/hooks/useHomePagination";

type TabsType = "all" | "favorites" | "villains" | "heroes";

export const HomePage = () => {
  const {
    currentPageSearchParam,
    currentLimitSearchParam,
    currentCategorySearchParam,
    activeTab,
    setSearchParams,
  } = useHomePagination();

  // => GET ALL HEROES
  const { data: heroesResponse } = useHeroPaginated(
    +currentPageSearchParam,
    +currentLimitSearchParam,
    currentCategorySearchParam,
  );

  // => GET SUMMARY STATS
  const { data: summary } = useHeroSummary();

  const handleSetTab = (tab: TabsType) => {
    setSearchParams((prev) => {
      prev.set("page", '1');
      prev.set("tab", tab);
      prev.set("category", getCategoryName(tab));
      return prev;
    });
  };

  const getCategoryName = (tab: TabsType) => {
    switch (tab) {
      case "heroes":
        return "Hero";
      case "villains":
        return "Villain";
      default:
        return "all";
    }
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
            All Characters ({summary?.totalCharacters})
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => handleSetTab("favorites")}
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => handleSetTab("heroes")}>
            Heroes ({summary?.heroCount})
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => handleSetTab("villains")}
          >
            Villains ({summary?.villainCount})
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
