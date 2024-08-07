import { createBrowserRouter } from 'react-router-dom';

import { AddRecipe } from '@/views/AddRecipe';
import { EditRecipeView } from '@/views/EditRecipeView';
import { FavoritesView } from '@/views/FavoritesView';
import { HomeView } from '@/views/HomeView';
import { RecipeView } from '@/views/RecipeView';

import App from '../App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: '/favorites',
        element: <FavoritesView />,
      },
      {
        path: '/add-recipe',
        element: <AddRecipe />,
      },
      {
        path: '/recipe/:id',
        element: <RecipeView />,
      },
      {
        path: '/recipe-edit/:id',
        element: <EditRecipeView />,
      },
    ],
  },
]);
