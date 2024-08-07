import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, MainLayout, RecipeForm } from '@/components';
import { schema } from '@/lib';
import { useRecipeStore } from '@/stores';

export const EditRecipeView = () => {
  const { id } = useParams();
  const editRecipe = useRecipeStore((state) => state.editRecipe);
  const recipe = useRecipeStore(
    (state) => state.recipes.find((r) => r.id === id)!,
  );
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: recipe,
    resolver: yupResolver(schema),
  });
  const submitHandler = methods.handleSubmit((values) => {
    if (recipe) {
      editRecipe({ ...recipe, ...values });
      navigate(`/recipe/${recipe.id}`);
    }
  });
  useEffect(() => {
    if (!recipe) {
      navigate('/not-found');
    }
  }, [recipe, navigate]);

  return (
    <MainLayout className="mb-16">
      <FormProvider {...methods}>
        <form
          onSubmit={submitHandler}
          className="md:w-6/12 md:mx-auto space-y-4"
        >
          <h1>Edit Recipe</h1>
          <RecipeForm />
          <div>
            <Button className="w-full" type="submit">
              Edit Recipe
            </Button>
          </div>
        </form>
      </FormProvider>
    </MainLayout>
  );
};
