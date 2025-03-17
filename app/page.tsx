import { CocktailList } from '../components/CocktailList/CocktailList';
import { FloatingActionButton } from '../components/FloatingActionButton';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Cocktail Explorer
        </h1>
        <p className="text-gray-600 mb-8 text-center max-w-2xl">
          Discover amazing cocktails and save your favorites. Refresh to see new
          recommendations.
        </p>
      </div>

      <CocktailList />
      <FloatingActionButton type="favorites" />
    </div>
  );
}
