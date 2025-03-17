import { useState, useEffect, useCallback } from 'react';
import { Cocktail } from '../types/cocktail';

const STORAGE_KEY = 'cocktail-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Cocktail[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const loadFavorites = useCallback(() => {
    const storedFavorites = localStorage.getItem(STORAGE_KEY) || '[]';
    if (storedFavorites) {
      try {
        const parsed = JSON.parse(storedFavorites);
        setFavorites(parsed);
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  // Save to localStorage whenever favorites change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isInitialized]);

  
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) {
        loadFavorites();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [loadFavorites]);

  // Listen for focus events to reload data
  useEffect(() => {
    const handleFocus = () => {
      loadFavorites();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [loadFavorites]);

  
  const toggleFavorite = useCallback((cocktail: Cocktail) => {
    let storedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      const existingCocktail = storedFavorites.find((f: { idDrink: string }) => f.idDrink === cocktail.idDrink);
      if (existingCocktail) {
        storedFavorites = storedFavorites.filter((f: { idDrink: string; }) => f.idDrink !== cocktail.idDrink);
      } else {
        storedFavorites.push(cocktail);
      }
      setFavorites(storedFavorites);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedFavorites));
  }, []);

  const isFavorite = useCallback((cocktailId: string) => {
    return favorites.some((f) => f.idDrink === cocktailId);
  }, [favorites]);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    reloadFavorites: loadFavorites,
  };
}