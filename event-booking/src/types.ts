export interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  eventTitle: string;
  status: string;
}
