import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControl } from "@/heroes/ui/SearchControl";

export const SearchPage = () => {
  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title="Search Heroes"
        subtitle="Find your favorite superheroes and villains"
      />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs
        currentPage="Search"
        // breadcrumbs={[{ label: "Home1", to: "/" }]}
      />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* SearchControl */}
      <SearchControl />
    </>
  );
};
