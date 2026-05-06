import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
  // state
  favorites: Hero[];
  favoriteCount: number;

  // methods
  isFavorite: (hero: Hero) => boolean;
  toggleFavorite: (hero: Hero) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const favoritesFromLocalStorage = (): Hero[] => {
  const favorites = localStorage.getItem('favorites');
  return favorites ? JSON.parse(favorites) : [];
}

// HOC porque recibe un children
export const FavoriteHeroProvider = ({ children }: PropsWithChildren) => {
  const [favorites, setFavorites] = useState<Hero[]>(favoritesFromLocalStorage());

  const toggleFavorite = (hero: Hero) => {
    const heroExist = favorites.find((h) => h.id === hero.id);

    if (heroExist) {
      const newFavs = favorites.filter((h) => h.id !== hero.id);
      setFavorites(newFavs);
      return;
    }

    setFavorites([...favorites, hero]);
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites])
  

  return (
    <FavoriteHeroContext
      value={{
        favorites,
        favoriteCount: favorites.length,
        toggleFavorite,
        isFavorite: (hero: Hero) => favorites.some(fav => fav.id === hero.id),
      }}
    >
      {children}
    </FavoriteHeroContext>
  );
};
