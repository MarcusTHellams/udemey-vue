import { produce } from 'immer';
import { create } from 'zustand';

import { UDEMY_REACT_RECIPE_APP } from '@/lib';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  favorite: boolean;
}

type NewRecipe = Omit<Recipe, 'id' | 'favorite'>;

type RecipeState = {
  recipes: Recipe[];
};

type RecipeActions = {
  addNewRecipe: (newRecipe: NewRecipe) => Recipe;
  editRecipe: (recipe: Recipe) => Recipe;
  toggleFavorite: (recipe: Recipe) => void;
};

const getRecipesFromLocalStorage = () => {
  const storedRecipes = localStorage.getItem(UDEMY_REACT_RECIPE_APP) || '[]';
  return JSON.parse(storedRecipes) as Recipe[];
};

export const useRecipeStore = create<RecipeState & RecipeActions>()(
  (set, get) => ({
    get recipes() {
      const recipes = getRecipesFromLocalStorage();
      return recipes;
    },
    addNewRecipe: ({ description, name }) => {
      const newRecipe = {
        id: `${get().recipes.length + 1}`,
        name,
        description,
        favorite: false,
      };
      const newRecipes = produce(get().recipes, (draft) => {
        draft.push(newRecipe);
      });

      set(() => {
        localStorage.setItem(
          UDEMY_REACT_RECIPE_APP,
          JSON.stringify(newRecipes),
        );
        return { recipes: newRecipes };
      });
      return newRecipe;
    },
    toggleFavorite: (recipe) => {
      const newRecipes = produce(get().recipes, (draft) => {
        const index = draft.findIndex((r) => r.id === recipe.id);
        draft[index].favorite = !draft[index].favorite;
      });
      localStorage.setItem(UDEMY_REACT_RECIPE_APP, JSON.stringify(newRecipes));
      set(() => ({ recipes: newRecipes }));
    },
    editRecipe: (recipe) => {
      const newRecipes = produce(get().recipes, (draft) => {
        const index = draft.findIndex((r) => r.id === recipe.id);
        draft[index] = recipe;
      });
      localStorage.setItem(UDEMY_REACT_RECIPE_APP, JSON.stringify(newRecipes));
      set(() => ({ recipes: newRecipes }));
      return recipe;
    },
  }),
);
