<script setup lang="ts">
import { BookingList, EventList } from '@/components';
import { api } from '@/lib';
import { type Booking, type Event } from '@/types';
import { useQueries } from '@tanstack/vue-query';
import { toRef } from 'vue';

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

const events = toRef(() => queries.value[0].data);
const bookings = toRef(() => queries.value[1].data);
const isFetching = toRef(() => queries.value[1].isFetching);
</script>

<template>
  <main class="container my-16">
    <h1>Event Booking App</h1>
    <h2>All Events</h2>
    <EventList :events="events" />
    <h2>Your Bookings</h2>
    <BookingList :is-fetching="isFetching" :bookings="bookings" />
  </main>
</template>
