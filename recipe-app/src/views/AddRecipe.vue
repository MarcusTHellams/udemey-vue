<script setup lang="ts">
import { Button, MainLayout, RecipeForm } from '@/components';
import { useRecipeStore } from '@/stores';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import { object, string } from 'yup';

const store = useRecipeStore();

const form = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required('Name is Required'),
      description: string().required('Description is Required'),
    }),
  ),
});

const router = useRouter();

const submitHandler = form.handleSubmit((values) => {
  const newRecipe = store.addNewRecipe(values);
  router.push({ name: 'recipe', params: { id: newRecipe.id } });
});
</script>

<template>
  <MainLayout class="mb-64">
    <form class="md:w-6/12 md:mx-auto space-y-4" @submit="submitHandler">
      <h1>Add Recipe</h1>
      <RecipeForm />
      <div><Button class="w-full" type="submit">Add Recipe</Button></div>
    </form>
  </MainLayout>
</template>
