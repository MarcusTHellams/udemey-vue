import { useMemo, useState } from 'react';

import { Input, MainLayout, RecipeList } from '@/components';
import { useRecipeStore } from '@/stores';

export const HomeView = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const [searchQuery, setSearchQuery] = useState('');
  const _filteredRecipes = useMemo(() => {
    return recipes.filter((r) => {
      return r.name.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [searchQuery, recipes]);

  return (
    <MainLayout>
      <h1>Recipe Book</h1>
      <div className="mb-8">
        <Input
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
          type="search"
          placeholder="Search Recipes..."
        />
      </div>
      <RecipeList recipes={_filteredRecipes} />
    </MainLayout>
  );
};
