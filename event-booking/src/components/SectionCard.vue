<script setup lang="ts">
import { Card } from '@/components';
</script>

<template>
  <Card>
    <div v-if="$slots.header" class="p-4 font-medium text-xl border-b border-gray-200">
      <slot name="header"></slot>
    </div>

    <div class="p-4" v-if="$slots.default" :class="{ 'border-b-8 border-gray-200': $slots.footer }">
      <slot></slot>
    </div>

    <div v-if="$slots.footer" class="p-4">
      <slot name="footer"></slot>
    </div>
  </Card>
</template>
