import { describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useHeroSummary } from './useHeroSummary';
import { getSummaryAction } from '../actions/get-summary.action';
import type { SummaryInformationResponse } from '../types/summary-information.response';

vi.mock('../actions/get-summary.action', () => ({
  getSummaryAction: vi.fn(),
}));

const mockGetSummaryAction = vi.mocked(getSummaryAction);

// provedor como wrapper, que envolverá el hook
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

describe('useHeroSummary', () => {
  it('should return the initial state', () => {
    const { result } = renderHook(() => useHeroSummary(), {
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
    const mockSummaryData = {
      totalCharacters: 10,
      strongestHero: {
        id: '1',
        alias: 'Superman',
        name: 'Clark Kent',
      },
      smartestHero: {
        id: '2',
        alias: 'Batman',
        name: 'Bruce Wayne',
      },
      heroCount: 7,
      villainCount: 3,
    } as SummaryInformationResponse;

    // mockeando una respuesta exitosa de la API
    mockGetSummaryAction.mockResolvedValueOnce(mockSummaryData);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true); // espera a que estado de éxito sea true
      console.log(result.current);
    });

    expect(result.current.isError).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });

  it('should return error state when API call fails', async () => {
    const mockError = new Error('API error');
    // mockeando que devuelva un error
    mockGetSummaryAction.mockRejectedValueOnce(mockError);

    const { result } = renderHook(() => useHeroSummary(), {
      wrapper: tanStackCustomProvider,
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.isSuccess).toBe(false);
    expect(mockGetSummaryAction).toHaveBeenCalled();
  });
});
