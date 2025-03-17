'use client';

import { useState } from 'react';
import { CocktailCard } from '../CocktailList/CocktailCard';
import { FloatingActionButton } from '../FloatingActionButton';
import { Toast } from '../Toast';
import { useFavorites } from '../../hooks/useFavorites';

export const FavoritesList = () => {
  const { favorites } = useFavorites();
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleToast = (message: string) => {
    setToast({ message, type: 'success' });
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">No favorites added yet.</p>
        <FloatingActionButton type="search" />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favorites.map((cocktail) => (
          <CocktailCard
            key={cocktail.idDrink}
            cocktail={cocktail}
            onToast={handleToast}
          />
        ))}
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};
