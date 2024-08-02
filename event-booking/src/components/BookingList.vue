<script setup lang="ts">
import { BookingCard, LoadingEventCard } from '@/components';
import { api } from '@/lib';
import { type Booking } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
defineProps<{
  bookings: Booking[] | undefined;
  isFetching: boolean;
  addBookingPending: boolean;
}>();

const queryClient = useQueryClient();

const { mutate } = useMutation<Booking, Error, string>({
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

const cancelBookingHandler = (id: string) => {
  mutate(id);
};
</script>

<template>
  <section v-if="bookings" class="grid grid-cols-1 gap-4">
    <BookingCard
      :pending="addBookingPending || isFetching"
      @delete-booking="cancelBookingHandler($event)"
      :booking="booking"
      v-for="booking in bookings"
      :key="booking.id"
    />
  </section>
  <template v-else>
    <LoadingEventCard v-for="i in 4" :key="i" />
  </template>
</template>
