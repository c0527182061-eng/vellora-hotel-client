
import type { RoomType } from './room';

export type BookingStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type MyBookingSort = 'createdAt_desc' | 'createdAt_asc' | 'checkIn_asc' | 'checkIn_desc';
export type AdminBookingSort = 'status' | MyBookingSort;



export interface BookingRoom {
  id: string | null;
  roomNumber: number;
  name: string;
  type: RoomType | null;
  maxGuests: number | null;
  floor: number | null;
  imageUrl: string | null;
  deleted: boolean;
}

export interface BookingCustomer {
  id: string;
  fullName: string;
  email: string;
}

export interface Booking {
  id: string;
  status: BookingStatus;
  checkIn: string; 
  checkOut: string; 
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  guestName: string;
  phone: string;
  notes: string | null;
  room: BookingRoom;
  customer: BookingCustomer;
  createdAt: string;
  updatedAt: string;
}


export interface CreateBookingRequest {
  roomId: string;
  checkIn: string; 
  checkOut: string; 
  phone: string;
  guestName?: string;
  notes?: string;
}

export interface DecideBookingRequest {
  status: 'APPROVED' | 'REJECTED';
}


export interface MyBookingsQuery {
  status?: BookingStatus;
  sort?: MyBookingSort;
}


export interface AdminBookingsQuery {
  status?: BookingStatus;
  from?: string; 
  to?: string; 
  roomId?: string;
  search?: string;
  sort?: AdminBookingSort;
}