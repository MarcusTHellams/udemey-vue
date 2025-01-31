<script setup lang="ts">
import { BookingCard, LoadingEventCard } from '@/components';
import { api } from '@/lib';
import { type Booking } from '@/types';
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';

const { isFetching, data: bookings } = useQuery({
  queryKey: ['bookings'],
  async queryFn() {
    return (await api.get<Booking[]>('/bookings')).data;
  },
});

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
    toast.error('Unable to Cancel Booking at this Time', {
      position: 'top-center',
    });
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
      :pending="booking.status === 'pending' || isFetching"
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
