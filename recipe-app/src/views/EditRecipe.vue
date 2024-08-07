<script setup lang="ts">
import { Button, MainLayout, RecipeForm } from '@/components';
import { useRecipeStore, type Recipe } from '@/stores';
import { toTypedSchema } from '@vee-validate/yup';
import { useForm } from 'vee-validate';
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { object, string } from 'yup';

const store = useRecipeStore();
const recipe = ref<Recipe | undefined>(undefined);

const form = useForm({
  validationSchema: toTypedSchema(
    object({
      name: string().required('Name is Required'),
      description: string().required('Description is Required'),
    }),
  ),
});

const router = useRouter();
const route = useRoute();

const submitHandler = form.handleSubmit((values) => {
  if (recipe.value) {
    const newRecipe = store.editRecipe({ ...recipe.value, ...values });
    router.push({ name: 'recipe', params: { id: newRecipe.id } });
  }
});

onMounted(() => {
  const id = route.params.id as string;
  const _recipe = store.getRecipeById(id);
  if (_recipe) {
    form.setValues(_recipe);
    recipe.value = _recipe;
  } else {
    router.push({ name: 'notFound', params: { id: id } });
  }
});
</script>

<template>
  <MainLayout class="mb-64">
    <form class="md:w-6/12 md:mx-auto space-y-4" @submit="submitHandler">
      <h1>Edit Recipe</h1>
      <RecipeForm />
      <div><Button class="w-full" type="submit">Edit Recipe</Button></div>
    </form>
  </MainLayout>
</template>
