import { FavoritesList } from '../../components/Favorites/FavoritesList';

export default function Favorites() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Favorite Cocktails
      </h1>
      <FavoritesList />
    </div>
  );
}
