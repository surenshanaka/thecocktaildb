import { SearchCocktails } from '../../components/Search/SearchCocktails';

export default function Search() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Search Cocktails</h1>
      <SearchCocktails />
    </div>
  );
}
