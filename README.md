# Thecocktaildb Front-end Code Challenge

This project is a cocktail search application that uses the [thecocktaildb API](https://www.thecocktaildb.com/api.php/) to retrieve and display random cocktails, search for specific cocktails and save favorite cocktails.

## Features

- Users can display random cocktails on the home page
- Users can click the refresh button to load a new set of 5 unique random cocktails
- Users can search for a cocktail by name
- Toggle cocktails to a favourites list
- Users can view all available favourites in the favourites list
- Implement responsive styling for mobile and desktop views
- Added unit tests to ensure functionality

## Project Setup

### Prerequisites

- Node Js 21.7.1
- NPM

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/surenshanaka/thecocktaildb.git
   cd thecocktaildb
   ```

2. Install dependencies (if applicable):

   ```bash
   npm install
   ```

3. Run the application:

   ```bash
   npm run dev
   ```

4. Run the unit tests:

   ```bash
   npm run test
   ```

## Technologies Used

- Next.js
- Tailwind CSS
- Jest - unit test
- ESLint
- Prettier
- TypeScript

## Future Improvements

- Add more comments throughout the code to improve readability and maintainability
- Integrate i18next for translations if required to ensuring multi language support
- Replace the loading spinner with skeleton loaders for the cocktail cards to improve user experience during loading
- Implement pagination for the favorites section if needed to manage large lists efficiently.
