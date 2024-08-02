<script setup lang="ts">
import { BookingList, EventList, Toaster } from '@/components';
</script>

<template>
  <main class="container my-16">
    <h1>Event Booking App</h1>
    <h2>All Events</h2>
    <EventList />
    <h2>Your Bookings</h2>
    <BookingList />
  </main>
  <Toaster rich-colors />
</template>
