<script setup lang="ts">
import { EventCard, LoadingEventCard, SectionCard, Button } from '@/components';
import { useMutation, useQueryClient, useQuery, useIsFetching } from '@tanstack/vue-query';
import { type Booking, type Event } from '@/types';
import { v4 as uuid } from 'uuid';
import { api } from '@/lib';
import { toast } from 'vue-sonner';

const queryClient = useQueryClient();

const areBookingsFetching = useIsFetching({ queryKey: ['bookings'] });

const {
  data: events,
  isLoading,
  refetch,
  isError,
} = useQuery({
  queryKey: ['events'],
  async queryFn() {
    return (await api.get<Event[]>('/event')).data;
  },
});

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
      userId: '1',
    };

    queryClient.setQueryData(['bookings'], (old: Booking[]) => [...old, newBooking]);
    return { previousBookings };
  },
  onError(_, __, context) {
    queryClient.setQueryData(
      ['bookings'],
      (context as { previousBookings: Booking[] }).previousBookings,
    );
    toast.error('Could not Confirm Booking', {
      position: 'top-center',
    });
  },
  onSettled() {
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  },
});

const registerHandler = (event: Event) => {
  const bookings = queryClient.getQueryData<Booking[]>(['bookings'])!;
  if (
    bookings.some((booking) => {
      return booking.eventId === event.id && booking.userId === '1';
    })
  ) {
    toast.error('You are already registered for this event', {
      position: 'top-center',
    });
    return;
  }
  mutate(event);
};
</script>

<template>
  <template v-if="isError">
    <SectionCard>
      <div class="space-y-4 flex flex-col items-center">
        <div class="text-red-500">Could not load events. Please try again.</div>
        <div>
          <Button @click="refetch()">Try Now</Button>
        </div>
      </div>
    </SectionCard>
  </template>
  <template v-if="!isLoading">
    <section v-if="!!events?.length" class="grid grid-cols-2 gap-8">
      <EventCard
        :pending="addBookingPending || !!areBookingsFetching"
        :event="event"
        v-for="event in events"
        :key="event.id"
        @register="registerHandler($event)"
      />
    </section>
    <template v-else>
      <div class="col-span-2 text-center text-gray-500">No Events Yet</div>
    </template>
  </template>
  <template v-else>
    <LoadingEventCard v-for="i in 4" :key="i" />
  </template>
</template>
