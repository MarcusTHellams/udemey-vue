<script setup lang="ts">
import { MainLayout, RecipeList } from '@/components';
import { useRecipeStore } from '@/stores';
const store = useRecipeStore();
</script>

<template>
  <MainLayout>
    <h1>Favorite Recipes</h1>
    <RecipeList :recipes="store.favoriteRecipes" />
  </MainLayout>
</template>
