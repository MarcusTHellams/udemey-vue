<script setup lang="ts">
import { EventCard, BookingCard, LoadingEventCard } from '@/components';
import { useQueries, useMutation, useQueryClient } from '@tanstack/vue-query';
import { api } from '@/lib';
import { v4 as uuid } from 'uuid';
import { type Booking, type Event } from '@/types';

const queryClient = useQueryClient();

const queries = useQueries({
  queries: [
    {
      queryKey: ['events'],
      async queryFn() {
        return (await api.get<Event[]>('/events')).data;
      },
    },
    {
      queryKey: ['bookings'],
      async queryFn() {
        return (await api.get<Booking[]>('/bookings')).data;
      },
    },
  ],
});

const { mutate: addBooking, isPending: addBookingPending } = useMutation<Booking, Error, Event>({
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

const { mutate: deleteBooking, isPending: deleteBookingPending } = useMutation<
  Booking,
  Error,
  string
>({
  mutationKey: ['cancelBooking'],
  async mutationFn(id) {
    return (await api.delete(`/bookings/${id}`)).data;
  },
  async onMutate(variables) {
    await queryClient.cancelQueries({ queryKey: ['bookings'] });
    const previousBookings = queryClient.getQueryData(['bookings']);

    queryClient.setQueryData(['bookings'], (old: Booking[]) =>
      old.filter((booking) => {
        return booking.id !== variables;
      }),
    );
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
  addBooking(event);
};
const cancelBookingHandler = (id: string) => {
  deleteBooking(id);
};
</script>

<template>
  <main class="container my-16">
    <h1>Event Booking App</h1>
    <h2>All Events</h2>
    <section v-if="queries[0].data" class="grid grid-cols-2 gap-8">
      <EventCard
        :pending="addBookingPending"
        :event="event"
        v-for="event in queries[0].data"
        :key="event.id"
        @register="registerHandler($event)"
      />
    </section>
    <template v-else>
      <LoadingEventCard v-for="i in 4" :key="i" />
    </template>
    <h2>Your Bookings</h2>
    <section v-if="queries[1].data" class="grid grid-cols-1 gap-4">
      <BookingCard
        :pending="
          deleteBookingPending ||
          addBookingPending ||
          !!queryClient.isFetching({
            queryKey: ['bookings'],
          })
        "
        @delete-booking="cancelBookingHandler($event)"
        :booking="booking"
        v-for="booking in queries[1].data"
        :key="booking.id"
      />
    </section>
    <template v-else>
      <LoadingEventCard v-for="i in 4" :key="i" />
    </template>
  </main>
</template>
