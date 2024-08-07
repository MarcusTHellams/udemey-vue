import { MainLayout, RecipeList } from '@/components';
import { useRecipeStore } from '@/stores';

export const FavoritesView = () => {
  const favorites = useRecipeStore((state) =>
    state.recipes.filter((r) => r.favorite),
  );
  return (
    <MainLayout>
      <h1>Favorite Recipes</h1>
      <RecipeList recipes={favorites} />
    </MainLayout>
  );
};
