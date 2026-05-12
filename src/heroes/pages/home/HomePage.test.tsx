import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { beforeEach, describe, expect, it, test, vi } from 'vitest';
import { HomePage } from './HomePage';
import { useHeroPaginated } from '@/heroes/hooks/useHeroPaginated';

// HomePage depende de useHeroPaginated que usa useQuery, así que se mockea
vi.mock('@/heroes/hooks/useHeroPaginated');
const mockUseHeroPaginated = vi.mocked(useHeroPaginated);

mockUseHeroPaginated.mockReturnValue({
  data: [],
  isLoading: false,
  isError: false,
  isSuccess: true,
} as unknown as ReturnType<typeof useHeroPaginated>);

const queryClient = new QueryClient();

const renderHomePage = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <HomePage />
      </QueryClientProvider>
    </MemoryRouter>,
  );
};

describe('HomePage', () => {
  beforeEach(() => {
    mockUseHeroPaginated.mockClear();
  });

  it('should render the HomePage component', () => {
    renderHomePage();
    expect(mockUseHeroPaginated).toHaveBeenCalledWith(1, 6, 'all');
  });

  it('should render the HomePage component with custom params', () => {
    renderHomePage(['/?page=2&limit=10&category=Hero']);
    expect(mockUseHeroPaginated).toHaveBeenCalledWith(2, 10, 'Hero');
  });

  test('should change villain tab', () => {
    renderHomePage(['/?tab=favorites']);

    const [, , , villainsTab] = screen.getAllByRole('tab');

    fireEvent.click(villainsTab);

    expect(mockUseHeroPaginated).toBeCalledWith(1, 6, 'Villain');
  });
});
