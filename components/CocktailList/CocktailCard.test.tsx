import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useFavorites } from '../../hooks/useFavorites';
import { CocktailCard } from './CocktailCard';

jest.mock('../../hooks/useFavorites');

const mockOnToast = jest.fn();
const mockToggleFavorite = jest.fn();
const mockIsFavorite = jest.fn();

const cocktail = {
  idDrink: '1',
  strDrink: 'Mojito',
  strCategory: 'Cocktail',
  strDrinkThumb: 'https://example.com/mojito.jpg',
};

describe('CocktailCard', () => {
  beforeEach(() => {
    mockOnToast.mockClear();
    mockToggleFavorite.mockClear();
    mockIsFavorite.mockClear();

    (useFavorites as jest.Mock).mockReturnValue({
      toggleFavorite: mockToggleFavorite,
      isFavorite: mockIsFavorite,
    });
  });

  test('should render cocktail details', () => {
    render(<CocktailCard cocktail={cocktail} onToast={mockOnToast} />);

    expect(screen.getByText('Mojito')).toBeInTheDocument();
    expect(screen.getByText('Cocktail')).toBeInTheDocument();
    expect(screen.getByAltText('Mojito')).toBeInTheDocument();
  });

  test('should handle image error', async () => {
    render(<CocktailCard cocktail={{ ...cocktail }} onToast={mockOnToast} />);

    const img = screen.getByRole('img', { name: 'Mojito' });
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('Image not available')).toBeInTheDocument();
    });
  });

  test('should show favorite icon when cocktail is a favorite', () => {
    mockIsFavorite.mockReturnValue(true);
    render(<CocktailCard cocktail={{ ...cocktail }} onToast={mockOnToast} />);

    expect(screen.getByTestId('favorite-button')).toContainElement(
      screen.getByTestId('heart-icon')
    );
    expect(screen.getByText('Remove')).toBeInTheDocument();
  });

  test('should show add icon when cocktail is not a favorite', () => {
    mockIsFavorite.mockReturnValue(false);
    render(<CocktailCard cocktail={cocktail} onToast={mockOnToast} />);

    expect(screen.getByTestId('favorite-button')).toContainElement(
      screen.getByTestId('plus-icon')
    );
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('should toggle favorite status on button click', async () => {
    mockIsFavorite.mockReturnValue(false);
    render(<CocktailCard cocktail={cocktail} onToast={mockOnToast} />);

    const button = screen.getByTestId('favorite-button');

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(cocktail);
      expect(mockOnToast).toHaveBeenCalledWith('Added to favorites');
    });
  });

  test('should show correct toast message when favorite is toggled', async () => {
    mockIsFavorite.mockReturnValue(true);
    render(<CocktailCard cocktail={cocktail} onToast={mockOnToast} />);

    const button = screen.getByTestId('favorite-button');

    await act(async () => {
      fireEvent.click(button);
    });

    await waitFor(() => {
      expect(mockToggleFavorite).toHaveBeenCalledWith(cocktail);
      expect(mockOnToast).toHaveBeenCalledWith('Removed from favorites');
    });
  });
});
