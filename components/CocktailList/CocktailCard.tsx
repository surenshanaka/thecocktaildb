'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Heart, Trash2, Plus } from 'lucide-react';
import { Cocktail } from '../../types/cocktail';
import { useFavorites } from '../../hooks/useFavorites';

interface Props {
  cocktail: Cocktail;
  onToast: (message: string) => void;
}

export function CocktailCard({ cocktail, onToast }: Props) {
  const [imageError, setImageError] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const [isHovered, setIsHovered] = useState(false);

  const isCurrentlyFavorite = isFavorite(cocktail.idDrink);

  const handleAction = () => {
    toggleFavorite(cocktail);
    if (isCurrentlyFavorite) {
      onToast?.('Removed from favorites');
    } else {
      onToast?.('Added to favorites');
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 group">
        {!imageError ? (
          <Image
            src={cocktail.strDrinkThumb}
            alt={cocktail.strDrink}
            fill
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Image not available</span>
          </div>
        )}

        <div
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={handleAction}
            className="bg-white text-gray-800 p-3 rounded-full transform transition-transform duration-300 hover:scale-110"
            data-testid="favorite-button"
          >
            {isCurrentlyFavorite ? (
              <Heart
                className="w-6 h-6 text-red-500 fill-current"
                data-testid="heart-icon"
              />
            ) : (
              <Plus className="w-6 h-6" data-testid="plus-icon" />
            )}
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">
          {cocktail.strDrink}
        </h3>
        <p className="text-gray-600 mb-4 text-sm">{cocktail.strCategory}</p>

        <button
          onClick={handleAction}
          className={`w-full px-4 py-2 rounded transition-all duration-300 flex items-center justify-center space-x-2
            ${
              isCurrentlyFavorite
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-green-500 hover:bg-green-600'
            } text-white`}
        >
          {isCurrentlyFavorite ? (
            <>
              <Trash2 className="w-5 h-5" />
              <span>Remove</span>
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              <span>Add</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
