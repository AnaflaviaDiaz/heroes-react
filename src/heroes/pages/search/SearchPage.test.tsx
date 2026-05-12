import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SearchPage from './SearchPage';
import { searchHeroesAction } from '@/heroes/actions/search-heroes.action';
import type { Hero } from '@/heroes/types/hero.interface';

// como depende de searchParams y useQuery
// se debe mockear searchHeroesAction
vi.mock('@/heroes/actions/search-heroes.action');
const mockedSearchHeroesAction = vi.mocked(searchHeroesAction);

// para evitar el generado del componente CustomJumbotron, se mockea también
vi.mock('@/components/custom/CustomJumbotron', () => ({
  CustomJumbotron: () => <div data-testid='custom-jumbotron'></div>,
}));

vi.mock('@/heroes/components/HeroGrid', () => ({
  HeroGrid: ({ heroes }: { heroes: Hero[] }) => (
    <div data-testid='hero-grid'>
      {heroes.map((hero) => (
        <div key={hero.id}>{hero.name}</div>
      ))}
    </div>
  ),
}));

const queryClient = new QueryClient();

const renderSearchPage = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <SearchPage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('SearchPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render with default values', () => {
    renderSearchPage();

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: '',
      strength: '',
    });

    expect(screen.getByTestId('custom-jumbotron')).toBeDefined();
  });

  it('should call search action with name parameter', () => {
    renderSearchPage(['/search?name=superman']);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: '',
    });

    expect(screen.getByTestId('custom-jumbotron')).toBeDefined();
  });

  it('should call search action with strength parameter', () => {
    renderSearchPage(['/search?strength=6']);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: '',
      strength: '6',
    });

    expect(screen.getByTestId('custom-jumbotron')).toBeDefined();
  });

  it('should call search action with strength and name parameters', () => {
    renderSearchPage(['/search?strength=6&name=superman']);

    expect(mockedSearchHeroesAction).toHaveBeenCalledWith({
      name: 'superman',
      strength: '6',
    });

    expect(screen.getByTestId('custom-jumbotron')).toBeDefined();
  });

  it('should render HeroGrid with search results', async () => {
    const mockHeroes: Hero[] = [
      { id: '2', name: 'Clark Kent' } as Hero,
      { id: '3', name: 'Bruce Wayne' } as Hero,
    ];

    mockedSearchHeroesAction.mockResolvedValue(mockHeroes);

    renderSearchPage();

    // al ser un action, es asincrono
    await waitFor(() => {
      expect(screen.getByText('Clark Kent')).toBeDefined();
      expect(screen.getByText('Bruce Wayne')).toBeDefined();
    });
  });
});
