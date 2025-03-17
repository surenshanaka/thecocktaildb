'use client';

import { RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CocktailCard } from './CocktailCard';
import { Toast } from '../Toast';
import { Cocktail } from '../../types/cocktail';
import { getRandomCocktail } from '../../services/api';

export const CocktailList = () => {
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function loadRandomCocktails() {
    setLoading(true);
    setIsRefreshing(true);
    const uniqueCocktails: Map<string, Cocktail> = new Map();

    try {
      while (uniqueCocktails.size < 5) {
        const cocktail = await getRandomCocktail();
        if (!uniqueCocktails.has(cocktail.idDrink)) {
          uniqueCocktails.set(cocktail.idDrink, cocktail);
        }
      }
      setCocktails(Array.from(uniqueCocktails.values()));
    } catch {
      setToast({ message: 'Error loading cocktails', type: 'error' });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    loadRandomCocktails();
  }, []);

  const handleToast = (message: string) => {
    setToast({ message, type: 'success' });
  };

  return (
    <>
      <div className="flex flex-col items-center mb-12">
        <button
          onClick={loadRandomCocktails}
          disabled={loading}
          className="flex items-center space-x-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          data-testid="refresh-button"
        >
          <RefreshCw
            className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`}
          />
          <span>Refresh Cocktails</span>
        </button>
      </div>

      {loading ? (
        <div
          className="flex items-center justify-center py-12"
          data-testid="loading"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {cocktails.map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              cocktail={cocktail}
              onToast={handleToast}
              data-testid={`cocktail-card-${cocktail.idDrink}`}
            />
          ))}
        </div>
      )}

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
