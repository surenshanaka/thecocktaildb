import { Cocktail } from "../types/cocktail";

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

export async function getRandomCocktail(): Promise<Cocktail> {
  const response = await fetch(`${BASE_URL}/random.php`);
  const data = await response.json();
  return data.drinks[0];
}

export async function searchCocktails(query: string): Promise<Cocktail[]> {
  const response = await fetch(`${BASE_URL}/search.php?s=${query}`);
  const data = await response.json();
  return data.drinks || [];
}