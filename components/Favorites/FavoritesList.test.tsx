import { Cocktail } from '../../types/cocktail';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useFavorites } from '../../hooks/useFavorites';
import { FavoritesList } from './FavoritesList';

jest.mock('../../hooks/useFavorites');
const mockedUseFavorites = useFavorites as jest.MockedFunction<
  typeof useFavorites
>;

jest.mock('../CocktailList/CocktailCard', () => ({
  CocktailCard: ({ cocktail }: { cocktail: Cocktail }) => (
    <div data-testid={`cocktail-card-${cocktail.idDrink}`}>
      {cocktail.strDrink}
    </div>
  ),
}));

jest.mock('../FloatingActionButton', () => ({
  FloatingActionButton: ({ type }: { type: string }) => (
    <button data-testid={`floating-action-button-${type}`}>
      Floating Action Button
    </button>
  ),
}));

const mockCocktails = [
  {
    idDrink: '1',
    strDrink: 'Mojito',
    strCategory: 'Cocktail',
    strDrinkThumb: 'https://example.com/mojito.jpg',
  },
  {
    idDrink: '2',
    strDrink: 'Margarita',
    strCategory: 'Cocktail',
    strDrinkThumb: 'https://example.com/margarita.jpg',
  },
];

describe('FavoritesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('displays empty state message when no favorites', () => {
    mockedUseFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
      reloadFavorites: jest.fn(),
    });

    render(<FavoritesList />);

    expect(screen.getByText('No favorites added yet.')).toBeInTheDocument();
    expect(
      screen.getByTestId('floating-action-button-search')
    ).toBeInTheDocument();
  });

  test('renders list of favorite cocktails when favorites exist', () => {
    mockedUseFavorites.mockReturnValue({
      favorites: mockCocktails,
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
      reloadFavorites: jest.fn(),
    });

    render(<FavoritesList />);

    mockCocktails.forEach((cocktail) => {
      expect(
        screen.getByTestId(`cocktail-card-${cocktail.idDrink}`)
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByText('No favorites added yet.')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('floating-action-button-search')
    ).not.toBeInTheDocument();
  });

  test('correctly applies responsive grid classes', () => {
    mockedUseFavorites.mockReturnValue({
      favorites: mockCocktails,
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
      reloadFavorites: jest.fn(),
    });

    const { container } = render(<FavoritesList />);

    const gridContainer = container.firstChild;
    expect(gridContainer).toHaveClass(
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      'lg:grid-cols-3',
      'xl:grid-cols-4',
      'gap-6'
    );
  });

  test('passes correct props to CocktailCard components', () => {
    mockedUseFavorites.mockReturnValue({
      favorites: mockCocktails,
      toggleFavorite: jest.fn(),
      isFavorite: jest.fn(),
      reloadFavorites: jest.fn(),
    });

    render(<FavoritesList />);

    mockCocktails.forEach((cocktail) => {
      const card = screen.getByTestId(`cocktail-card-${cocktail.idDrink}`);
      expect(card).toHaveTextContent(cocktail.strDrink);
    });
  });
});
