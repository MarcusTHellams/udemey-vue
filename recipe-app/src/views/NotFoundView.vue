<script setup lang="ts">
import { MainLayout } from '@/components';
</script>

<template>
  <MainLayout>
    <h1>404 Path Not Found</h1>
    <p>{{ $route.params.pathMatch }}</p>
  </MainLayout>
</template>
