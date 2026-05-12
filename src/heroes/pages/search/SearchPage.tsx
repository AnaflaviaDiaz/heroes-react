import { useSearchParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';

import { CustomBreadcrumbs } from '@/components/custom/CustomBreadcrumbs';
import { CustomJumbotron } from '@/components/custom/CustomJumbotron';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import { HeroGrid } from '@/heroes/components/HeroGrid';
import { HeroStats } from '@/heroes/components/HeroStats';
import { SearchControl } from '@/heroes/ui/SearchControl';

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const currentNameSearchParam = searchParams.get('name') || '';
  const currentStrengthSearchParam = searchParams.get('strength') || '';

  const params = {
    name: currentNameSearchParam,
    strength: currentStrengthSearchParam,
  };
  const { data: searchData = [] } = useQuery({
    queryKey: [
      'searchHeroes',
      params,
    ],
    queryFn: () => searchHeroesAction(params),
    staleTime: 1000 * 60 * 5, // 5min
    retry: false,
  });

  return (
    <>
      {/* Header */}
      <CustomJumbotron
        title='Search Heroes'
        subtitle='Find your favorite superheroes and villains'
      />

      {/* Breadcrumbs */}
      <CustomBreadcrumbs currentPage='Search' />

      {/* Stats Dashboard */}
      <HeroStats />

      {/* SearchControl */}
      <SearchControl />

      {/* Lista de heroes y villanos */}
      <HeroGrid heroes={searchData} />
    </>
  );
};
