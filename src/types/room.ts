
export const ROOM_TYPES = ["SINGLE", "DOUBLE", "FAMILY", "SUITE"] as const
export type RoomType = typeof ROOM_TYPES[number]

export const ROOM_STATUSES = ["AVAILABLE", "UNAVAILABLE"] as const
export type RoomStatus = typeof ROOM_STATUSES[number]
export type RoomSort = 'roomNumber_asc' | 'price_asc' | 'price_desc' | 'name_asc';

export interface Room {
  id: string;
  roomNumber: number;
  name: string;
  type: RoomType;
  pricePerNight: number;
  maxGuests: number;
  floor: number;
  description: string | null;
  imageUrl: string | null; 
  status: RoomStatus;
  createdAt: string;
  updatedAt: string;
}
export interface RoomCard {
  id:string,
  name: string;
  type: RoomType;
  description: string | null;
  imageUrl: string | null; 
}

export interface RoomsQuery {
  checkIn?: string; 
  checkOut?: string;
  type?: RoomType;
  minPrice?: number;
  maxPrice?: number;
  guests?: number;
  search?: string;
  status?: RoomStatus;
  sort?: RoomSort;
}


export interface RoomFormFields {
  roomNumber: number;
  name: string;
  type: RoomType;
  pricePerNight: number;
  maxGuests: number;
  floor: number;
  description?: string;
  status?: RoomStatus;
}


export interface RoomUpdateFields{
  roomNumber?: number;
  name?: string;
  type?: RoomType;
  pricePerNight?: number;
  maxGuests?: number;
  floor?: number;
  description?: string;
  status?: RoomStatus;
}