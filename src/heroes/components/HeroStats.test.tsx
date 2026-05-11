import type { PropsWithChildren } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { HeroStats } from './HeroStats';
import { useHeroSummary } from '../hooks/useHeroSummary';
import type { SummaryInformationResponse } from '../types/summary-information.response';
import { FavoriteHeroContext } from '../context/FavoriteHeroContext';

const summaryMockData: SummaryInformationResponse = {
  totalCharacters: 25,
  strongestHero: {
    id: '1',
    name: 'Clark Kent',
    slug: 'clark-kent',
    alias: 'Superman',
    powers: [
      'Súper fuerza',
      'Vuelo',
      'Visión de calor',
      'Visión de rayos X',
      'Invulnerabilidad',
      'Súper velocidad',
    ],
    description:
      'El Último Hijo de Krypton, protector de la Tierra y símbolo de esperanza para toda la humanidad.',
    strength: 10,
    intelligence: 8,
    speed: 9,
    durability: 10,
    team: 'Liga de la Justicia',
    image: '1.jpeg',
    firstAppearance: '1938',
    status: 'Active',
    category: 'Hero',
    universe: 'DC',
  },
  smartestHero: {
    id: '2',
    name: 'Bruce Wayne',
    slug: 'bruce-wayne',
    alias: 'Batman',
    powers: [
      'Artes marciales',
      'Habilidades de detective',
      'Tecnología avanzada',
      'Sigilo',
      'Genio táctico',
    ],
    description:
      'El Caballero Oscuro de Ciudad Gótica, que utiliza el miedo como arma contra el crimen y la corrupción.',
    strength: 6,
    intelligence: 10,
    speed: 6,
    durability: 7,
    team: 'Liga de la Justicia',
    image: '2.jpeg',
    firstAppearance: '1939',
    status: 'Active',
    category: 'Hero',
    universe: 'DC',
  },
  heroCount: 18,
  villainCount: 7,
};

// En el componente se usa el customHook useHeroSummary
vi.mock('../hooks/useHeroSummary');
const mockUserHeroSummary = vi.mocked(useHeroSummary);

// creando mock de useQuery para evitar errores relacionados con la falta de un
// proveedor de React Query en el entorno de pruebas, ya que HeroStats utiliza
// useHeroSummary, que a su vez utiliza useQuery.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false, // deshabilitar reintentos para pruebas
    },
  },
});

// Mock del contexto de favoritos
const mockFavoriteHeroContextValue = {
  favorites: [],
  favoriteCount: 0,
  isFavorite: vi.fn(),
  toggleFavorite: vi.fn(),
};

// Wrapper para proporcionar el FavoriteHeroContext mockeado
const FavoriteHeroContextWrapper = ({
  children,
  mockData = mockFavoriteHeroContextValue,
}: PropsWithChildren<{ mockData?: typeof mockFavoriteHeroContextValue }>) => (
  <FavoriteHeroContext.Provider value={mockData}>
    {children}
  </FavoriteHeroContext.Provider>
);

// mockData es lo que retornará el hook useHeroSummary
const renderHeroStats = (
  mockData?: Partial<SummaryInformationResponse>,
  favoriteCount: number = 0,
) => {
  mockUserHeroSummary.mockReturnValue({
    data: mockData || undefined,
  } as unknown as ReturnType<typeof useHeroSummary>);

  return render(
    <QueryClientProvider client={queryClient}>
      <FavoriteHeroContextWrapper
        mockData={{
          ...mockFavoriteHeroContextValue,
          favoriteCount,
        }}
      >
        <HeroStats />
      </FavoriteHeroContextWrapper>
    </QueryClientProvider>,
  );
};

describe('HeroStats component', () => {
  it('should render component with default values', () => {
    const { container } = renderHeroStats();
    expect(screen.getByText('Loading...')).toBeDefined();
    expect(container).toMatchSnapshot();
  });

  it('should render component with data', () => {
    const { container } = renderHeroStats(summaryMockData);
    screen.debug();
    expect(container).toMatchSnapshot();
    expect(screen.getByText('Total Characters')).toBeDefined();
    expect(screen.getByText('Favorites')).toBeDefined();
  });

  it('should change the percentage of favorites when favoriteCount changes', () => {
    const { container } = renderHeroStats(summaryMockData, 12);
    expect(container).toMatchSnapshot();
    expect(screen.getByText('48.00% of total')).toBeDefined();
  });
});
