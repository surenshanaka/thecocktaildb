import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import { SearchCocktails } from './SearchCocktails';
import { searchCocktails } from '../../services/api';

jest.mock('../../services/api', () => ({
  searchCocktails: jest.fn(),
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

describe('SearchCocktails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the input and search button', () => {
    render(<SearchCocktails />);

    const input = screen.getByPlaceholderText('Search for a cocktail...');
    const button = screen.getByRole('button', { name: /search/i });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('should update input value when typed into', () => {
    render(<SearchCocktails />);

    const input = screen.getByPlaceholderText('Search for a cocktail...');
    fireEvent.change(input, { target: { value: 'Margarita' } });

    expect(input).toHaveValue('Margarita');
  });

  test('should call searchCocktails when the form is submitted', async () => {
    (searchCocktails as jest.Mock).mockResolvedValue(mockCocktails);

    render(<SearchCocktails />);

    const input = screen.getByPlaceholderText('Search for a cocktail...');
    fireEvent.change(input, { target: { value: 'Margarita' } });

    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(searchCocktails).toHaveBeenCalledWith('Margarita');
      expect(screen.getByText('Margarita')).toBeInTheDocument();
      expect(screen.getByText('Mojito')).toBeInTheDocument();
    });
  });

  test('should show cocktails when search is successful', async () => {
    (searchCocktails as jest.Mock).mockResolvedValue(mockCocktails);

    render(<SearchCocktails />);

    const input = screen.getByPlaceholderText('Search for a cocktail...');
    fireEvent.change(input, { target: { value: 'Margarita' } });

    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(screen.getByText('Margarita')).toBeInTheDocument();
      expect(screen.getByText('Mojito')).toBeInTheDocument();
    });
  });

  test('should not search if the input is empty', async () => {
    render(<SearchCocktails />);

    const input = screen.getByPlaceholderText('Search for a cocktail...');

    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
    });

    const button = screen.getByRole('button', { name: /search/i });

    await act(async () => {
      fireEvent.click(button);
    });

    expect(searchCocktails).not.toHaveBeenCalled();
  });
});
