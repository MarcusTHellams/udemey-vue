import { useLocalStorage } from '@vueuse/core';
import { defineStore } from 'pinia';
import { computed } from 'vue';
import { UDEMY_VUE_RECIPE_APP } from '@/lib/constants';

export interface Recipe {
  id: string;
  name: string;
  description: string;
  favorite: boolean;
}

type NewRecipe = Omit<Recipe, 'id' | 'favorite'>;

export const useRecipeStore = defineStore('recipeStore', () => {
  const recipes = useLocalStorage(UDEMY_VUE_RECIPE_APP, '[]');
  const parsedRecipes = computed<Recipe[]>(() => {
    return JSON.parse(recipes.value);
  });

  const favoriteRecipes = computed(() => {
    return parsedRecipes.value.filter((recipe) => recipe.favorite);
  });

  const favoriteIds = computed(() => {
    return favoriteRecipes.value.map((recipe) => recipe.id);
  });

  const filteredRecipes = (query: string) => {
    return parsedRecipes.value.filter((recipe) => {
      return recipe.name.toLowerCase().includes(query.toLowerCase());
    });
  };

  const addNewRecipe = ({ name, description }: NewRecipe) => {
    const newRecipe = {
      id: `${parsedRecipes.value.length + 1}`,
      name,
      description,
      favorite: false,
    };
    parsedRecipes.value.push(newRecipe);
    recipes.value = JSON.stringify(parsedRecipes.value);
    return newRecipe;
  };

  const getRecipeById = (id: string) => parsedRecipes.value.find((recipe) => recipe.id === id);

  const isFavorite = (id: string) => favoriteIds.value.includes(id);

  const toggleFavorite = (recipe: Recipe) => {
    const index = parsedRecipes.value.findIndex((r) => r.id === recipe.id);
    parsedRecipes.value[index].favorite = !parsedRecipes.value[index].favorite;
    recipes.value = JSON.stringify(parsedRecipes.value);
  };

  const editRecipe = (recipe: Recipe) => {
    const index = parsedRecipes.value.findIndex((r) => r.id === recipe.id);

    parsedRecipes.value[index] = recipe;

    recipes.value = JSON.stringify(parsedRecipes.value);
    return recipe;
  };

  return {
    addNewRecipe,
    editRecipe,
    favoriteRecipes,
    filteredRecipes,
    getRecipeById,
    isFavorite,
    parsedRecipes,
    recipes,
    toggleFavorite,
  };
});
