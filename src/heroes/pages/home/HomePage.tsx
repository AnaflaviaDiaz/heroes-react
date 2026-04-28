import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/ui/SearchControl";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { CustomPagination } from "@/components/custom/CustomPagination";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";

type TabsType = "all" | "favorites" | "villains" | "heroes";

export const HomePage = () => {
  const [activeTab, setActiveTab] = useState<TabsType>("all");

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
          <TabsTrigger value="all" onClick={() => setActiveTab("all")}>
            All Characters (16)
          </TabsTrigger>
          <TabsTrigger
            value="favorites"
            className="flex items-center gap-2"
            onClick={() => setActiveTab("favorites")}
          >
            Favorites (3)
          </TabsTrigger>
          <TabsTrigger value="heroes" onClick={() => setActiveTab("heroes")}>
            Heroes (12)
          </TabsTrigger>
          <TabsTrigger
            value="villains"
            onClick={() => setActiveTab("villains")}
          >
            Villains (2)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <h1>All Characters</h1>
          <HeroGrid />
        </TabsContent>
        <TabsContent value="favorites">
          <h1>Favorites</h1>
          <HeroGrid />
        </TabsContent>
        <TabsContent value="heroes">
          <h1>Heroes</h1>
          <HeroGrid />
        </TabsContent>
        <TabsContent value="villains">
          <h1>Villains</h1>
          <HeroGrid />
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <CustomPagination totalPages={8} />
    </>
  );
};
