<script setup lang="ts">
import { cn } from '@/lib/utils';
const props = withDefaults(defineProps<{ as?: keyof HTMLElementTagNameMap; class?: string }>(), {
  as: 'main',
});
</script>
<template>
  <component :is="props.as" :class="cn('container mt-16', props.class)">
    <slot />
  </component>
</template>
