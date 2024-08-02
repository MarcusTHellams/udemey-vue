<script setup lang="ts">
import { EventCard, LoadingEventCard } from '@/components';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { type Booking, type Event } from '@/types';
import { v4 as uuid } from 'uuid';
import { api } from '@/lib';

defineProps<{
  events: Event[] | undefined;
}>();

const queryClient = useQueryClient();

const { mutate, isPending: addBookingPending } = useMutation<Booking, Error, Event>({
  mutationKey: ['bookEvent'],
  async mutationFn({ id, title }) {
    return (
      await api.post('/bookings', {
        id: uuid(),
        userId: '1',
        eventId: id,
        eventTitle: title,
        status: 'confirmed',
      })
    ).data;
  },
  async onMutate(variables) {
    await queryClient.cancelQueries({ queryKey: ['bookings'] });
    const previousBookings = queryClient.getQueryData(['bookings']);

    const newBooking = {
      id: uuid(),
      eventTitle: variables.title,
      status: 'pending',
    };

    queryClient.setQueryData(['bookings'], (old: Booking[]) => [...old, newBooking]);
    return { previousBookings };
  },
  onError(_, __, context) {
    queryClient.setQueryData(
      ['bookings'],
      (context as { previousBookings: Booking[] }).previousBookings,
    );
  },
  onSettled() {
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  },
});

const registerHandler = (event: Event) => {
  mutate(event);
};
</script>

<template>
  <section v-if="events" class="grid grid-cols-2 gap-8">
    <EventCard
      :pending="addBookingPending"
      :event="event"
      v-for="event in events"
      :key="event.id"
      @register="registerHandler($event)"
    />
  </section>
  <template v-else>
    <LoadingEventCard v-for="i in 4" :key="i" />
  </template>
</template>
