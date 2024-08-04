<script setup lang="ts">
import { MainLayout, RecipeList, Input } from '@/components';
import { useRecipeStore } from '@/stores';
import { computed, ref } from 'vue';

const store = useRecipeStore();

const searchQuery = ref('');

const filteredRecipes = computed(() => {
  return store.filteredRecipes(searchQuery.value);
});
</script>

<template>
  <MainLayout>
    <h1>Recipe Book</h1>
    <div class="mb-8">
      <Input type="search" v-model="searchQuery" placeholder="Search Recipes..." />
    </div>
    <RecipeList :recipes="filteredRecipes" />
  </MainLayout>
</template>
