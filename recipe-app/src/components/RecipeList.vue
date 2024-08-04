<script setup lang="ts">
import type { Recipe } from '@/stores';
import { RouterLink } from 'vue-router';
defineProps<{
  recipes: Recipe[];
}>();
</script>

<template>
  <nav v-if="!!recipes.length">
    <ul class="p-0">
      <li class="list-none" v-for="recipe in recipes" :key="recipe.id">
        <RouterLink class="prose max-w-none" :to="`/recipe/${recipe.id}`">
          {{ recipe.name }}
        </RouterLink>
      </li>
    </ul>
  </nav>
  <div v-else class="text-gray-500">No Recipes Found!</div>
</template>
