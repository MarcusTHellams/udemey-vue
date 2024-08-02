<script setup lang="ts">
import { SectionCard, Button } from '@/components';
import { type Booking } from '@/types';

defineProps<{
  booking: Booking;
  pending: boolean;
}>();
defineEmits<{
  deleteBooking: [id: string];
}>();
</script>

<template>
  <SectionCard>
    <div class="flex justify-between items-center">
      <p>{{ booking.eventTitle }} {{ booking.status }}</p>
      <Button
        :disabled="pending"
        @click="$emit('deleteBooking', booking.id)"
        variant="destructive"
        size="xs"
        >Cancel</Button
      >
    </div>
  </SectionCard>
</template>
