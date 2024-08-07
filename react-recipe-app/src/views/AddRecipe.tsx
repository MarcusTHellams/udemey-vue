import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { Button, MainLayout, RecipeForm } from '@/components';
import { schema } from '@/lib';
import { useRecipeStore } from '@/stores';

export const AddRecipe = () => {
  const addNewRecipe = useRecipeStore((state) => state.addNewRecipe);
  const navigate = useNavigate();
  const methods = useForm({
    resolver: yupResolver(schema),
  });
  const submitHandler = methods.handleSubmit((values) => {
    const newRecipe = addNewRecipe(values);
    navigate(`/recipe/${newRecipe.id}`);
  });
  return (
    <MainLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={submitHandler}
          className="md:w-6/12 md:mx-auto space-y-4"
        >
          <h1>Add Recipe</h1>
          <RecipeForm />
          <div>
            <Button className="w-full" type="submit">
              Add Recipe
            </Button>
          </div>
        </form>
      </FormProvider>
    </MainLayout>
  );
};
