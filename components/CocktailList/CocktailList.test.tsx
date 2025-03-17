import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import { getRandomCocktail } from '../../services/api';
import { CocktailList } from './CocktailList';

jest.mock('../../services/api');
const mockedGetRandomCocktail = getRandomCocktail as jest.MockedFunction<
  typeof getRandomCocktail
>;

const mockCocktail = {
  idDrink: '1',
  strDrink: 'Mojito',
  strCategory: 'Cocktail',
  strDrinkThumb: 'https://example.com/mojito.jpg',
};

describe('CocktailList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedGetRandomCocktail.mockResolvedValue(mockCocktail);
  });

  test('renders loading state initially', () => {
    render(<CocktailList />);
    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  test('displays refresh button', () => {
    render(<CocktailList />);
    const refreshButton = screen.getByTestId('refresh-button');
    expect(refreshButton).toBeInTheDocument();
    expect(refreshButton).toHaveTextContent('Refresh Cocktails');
  });

  test('loads and displays 5 unique cocktails', async () => {
    const mockCocktails = Array.from({ length: 5 }, (_, i) => ({
      ...mockCocktail,
      idDrink: String(i + 1),
      strDrink: `Cocktail ${i + 1}`,
    }));

    let callCount = 0;
    mockedGetRandomCocktail.mockImplementation(async () => {
      return mockCocktails[callCount++ % 5];
    });

    render(<CocktailList />);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    mockCocktails.forEach((cocktail) => {
      expect(screen.getByText(cocktail.strDrink)).toBeInTheDocument();
    });
  });
});
