<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <nav class="bg-white shadow-lg">
    <ul
      class="not-prose container flex items-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300"
    >
      <li>
        <RouterLink
          active-class="border-green-500"
          to="/"
          class="not-prose text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >home</RouterLink
        >
      </li>
      <li>
        <RouterLink
          active-class="border-green-500"
          to="/favorites"
          class="not-prose text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >favorites</RouterLink
        >
      </li>
      <li>
        <RouterLink
          active-class="border-green-500"
          to="/add-recipe"
          class="not-prose text-gray-800 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
          >Add Recipe</RouterLink
        >
      </li>
    </ul>
  </nav>
  <RouterView />
</template>
