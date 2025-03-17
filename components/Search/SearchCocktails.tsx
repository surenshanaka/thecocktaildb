'use client';

import { useState } from 'react';
import { CocktailCard } from '../CocktailList/CocktailCard';
import { Toast } from '../Toast';
import { Cocktail } from '../../types/cocktail';
import { searchCocktails } from '../../services/api';

export const SearchCocktails = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Cocktail[]>([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    const searchResults = await searchCocktails(query);
    setResults(searchResults);
    setLoading(false);
  }

  const handleToast = (message: string) => {
    setToast({ message, type: 'success' });
  };

  return (
    <>
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a cocktail..."
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {results.map((cocktail) => (
            <CocktailCard
              key={cocktail.idDrink}
              cocktail={cocktail}
              onToast={handleToast}
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
