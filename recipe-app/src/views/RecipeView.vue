<script setup lang="ts">
import { MainLayout, Button } from '@/components';
import { useRecipeStore } from '@/stores';
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
const store = useRecipeStore();

const route = useRoute();

const recipe = computed(() => {
  return store.getRecipeById(route.params.id as string);
});

const isFavorite = computed(() => {
  return store.isFavorite(route.params.id as string);
});
</script>

<template>
  <MainLayout>
    <h1>{{ recipe?.name }}</h1>
    <p>{{ recipe?.description }}</p>
    <div class="flex items-center gap-4">
      <Button variant="outline" class="not-prose" as-child>
        <RouterLink :to="{ name: 'editRecipe', params: { id: recipe?.id } }">Edit</RouterLink>
      </Button>
      <Button v-if="recipe" @click="store.toggleFavorite(recipe)">{{
        isFavorite ? 'Remove from Favorites' : 'Add to Favorites'
      }}</Button>
    </div>
  </MainLayout>
</template>
