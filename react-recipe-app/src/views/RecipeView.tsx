import { Link, useParams } from 'react-router-dom';

import { Button, MainLayout } from '@/components';
import { useRecipeStore } from '@/stores';

export const RecipeView = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === id),
  );

  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);

  return (
    <MainLayout>
      <h1>{recipe?.name}</h1>
      <p>{recipe?.description}</p>
      <div className="flex items-center gap-4">
        <Button variant="outline" className="not-prose" asChild>
          <Link to={`/recipe-edit/${id}`}>Edit</Link>
        </Button>
        {recipe && (
          <Button
            onClick={() => {
              toggleFavorite(recipe);
            }}
          >
            {recipe?.favorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Button>
        )}
      </div>
    </MainLayout>
  );
};
