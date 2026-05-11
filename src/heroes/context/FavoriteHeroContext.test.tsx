import { use } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FavoriteHeroContext, FavoriteHeroProvider } from './FavoriteHeroContext';
import type { Hero } from '../types/hero.interface';

const mockHero: Hero = {
  id: '1',
  name: 'Mock Hero',
} as Hero;

// Mockeando localStorage para evitar errores en el entorno de pruebas, ya que localStorage 
// no está disponible en Node.js
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// componente de prueba para renderizar el contexto, no es necesario renderizar 
// un componente hijo porque lo que queremos probar es el contexto en sí mismo, 
// no su interacción con otros componentes.
const TestComponent = () => {
  const { favorites, favoriteCount, isFavorite, toggleFavorite } = use(FavoriteHeroContext);
  return (
    <div>
      <p data-testid="favorite-list">Favorites: {favorites.length}</p>
      <p data-testid="favorite-count">Favorite Count: {favoriteCount}</p>
      <p data-testid="is-a-favorite">Is Favorite: {isFavorite(mockHero).toString()}</p>

      <button data-testid="toggle-favorite" onClick={() => toggleFavorite(mockHero)}>Toggle Favorite</button>
    </div>
  );
}

const renderContextTest = () => {
  return render(
    <FavoriteHeroProvider>
      <TestComponent />
    </FavoriteHeroProvider>
  )
}

describe('FavoriteHeroContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    renderContextTest();

    expect(screen.getByTestId('favorite-list').textContent).toBe('Favorites: 0');
    expect(screen.getByTestId('favorite-count').textContent).toBe('Favorite Count: 0');
    expect(screen.getByTestId('is-a-favorite').textContent).toBe('Is Favorite: false');
  });

  it('should toggle favorite status of a hero', () => {
    renderContextTest();
    const toggleButton = screen.getByTestId('toggle-favorite');

    // Agregar a favoritos
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('favorite-list').textContent).toBe('Favorites: 1');
    expect(screen.getByTestId('favorite-count').textContent).toBe('Favorite Count: 1');
    expect(screen.getByTestId('is-a-favorite').textContent).toBe('Is Favorite: true');
    // expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toEqual([mockHero]);
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([mockHero]));
    
    // Quitar de favoritos
    fireEvent.click(toggleButton);
    expect(screen.getByTestId('favorite-list').textContent).toBe('Favorites: 0');
    expect(screen.getByTestId('favorite-count').textContent).toBe('Favorite Count: 0');
    expect(screen.getByTestId('is-a-favorite').textContent).toBe('Is Favorite: false');
    // expect(JSON.parse(localStorage.getItem('favorites') || '[]')).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([]));

    expect(localStorageMock.setItem).toHaveBeenCalledWith('favorites', JSON.stringify([]));
  });
});
