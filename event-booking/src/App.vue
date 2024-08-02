<script setup lang="ts">
import { BookingList, EventList } from '@/components';
import { api } from '@/lib';
import { type Booking, type Event } from '@/types';
import { useQueries } from '@tanstack/vue-query';
import { ref } from 'vue';

const addBookingPending = ref(false);

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
</script>

<template>
  <main class="container my-16">
    <h1>Event Booking App</h1>
    <h2>All Events</h2>
    <EventList @get-is-pending="addBookingPending = $event" :events="queries[0]?.data" />
    <h2>Your Bookings</h2>
    <BookingList
      :add-booking-pending="addBookingPending"
      :is-fetching="queries[1].isFetching"
      :bookings="queries[1]?.data"
    />
  </main>
</template>
