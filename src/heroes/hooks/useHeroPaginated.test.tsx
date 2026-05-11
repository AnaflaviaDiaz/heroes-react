import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useHeroPaginated } from './useHeroPaginated';
import { getHeroesByPageAction } from '../actions/get-heroes-by-page.action';

vi.mock('../actions/get-heroes-by-page.action', () => ({
  getHeroesByPageAction: vi.fn(),
}));

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction);

// provedor como wrapper, que envolverá el hook para testear QueryClient
const tanStackCustomProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useHeroPaginated', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useHeroPaginated(1, 10), {
      wrapper: tanStackCustomProvider,
    });
    expect(result.current).toEqual(
      expect.objectContaining({
        data: undefined,
        error: null,
        isLoading: true,
      }),
    );
  });

  it('should return success state with data when API call is successful', async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    // mockeando una respuesta exitosa de la API
    mockGetHeroesByPageAction.mockResolvedValueOnce(mockHeroesData);

    const { result } = renderHook(() => useHeroPaginated(1, 10), {
      wrapper: tanStackCustomProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 10, 'all');
  });

  it('should call getHeroesByPageAction with arguments', async () => {
    const mockHeroesData = {
      total: 20,
      pages: 4,
      heroes: [],
    };

    // mockeando una respuesta exitosa de la API
    mockGetHeroesByPageAction.mockResolvedValueOnce(mockHeroesData);

    const { result } = renderHook(() => useHeroPaginated(1, 10, 'heroes'), {
      wrapper: tanStackCustomProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.data).toBeDefined();
      expect(result.current.error).toBeNull();
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1, 10, 'heroes');
  });

  it('should return error state when API call fails', async () => {
    const mockError = new Error('API error');
    // mockeando que devuelva un error
    mockGetHeroesByPageAction.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useHeroPaginated(1, 10), {
      wrapper: tanStackCustomProvider,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(mockGetHeroesByPageAction).toHaveBeenCalled();
  });
});
