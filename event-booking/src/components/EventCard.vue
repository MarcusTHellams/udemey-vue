<script setup lang="ts">
import { Button, SectionCard } from '@/components';
import type { Event } from '@/types';

defineProps<{ event: Event; pending: boolean }>();
defineEmits<{
  register: [event: Event];
}>();
</script>

<template>
  <SectionCard>
    <template #header>
      {{ event.title }}
    </template>
    <template #default>
      <p>{{ event.date }}</p>
    </template>
    <template #footer>
      <div class="space-y-4">
        <p>{{ event.description }}</p>
        <div class="flex justify-end">
          <Button :disabled="pending" @click="$emit('register', event)">Register</Button>
        </div>
      </div>
    </template>
  </SectionCard>
</template>
