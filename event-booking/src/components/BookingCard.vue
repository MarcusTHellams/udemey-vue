<script setup lang="ts">
import { SectionCard, Button } from '@/components';
import { type Booking } from '@/types';
import { CheckCircle, LoaderCircle } from 'lucide-vue-next';

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
      <p class="flex items-center gap-1">
        {{ booking.eventTitle }}
        <component
          :class="{ 'text-red-500 animate-spin': pending, 'text-green-500': !pending }"
          :is="pending ? LoaderCircle : CheckCircle"
        />
      </p>
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
