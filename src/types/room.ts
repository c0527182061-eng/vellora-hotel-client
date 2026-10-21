
export type RoomType = 'SINGLE' | 'DOUBLE' | 'FAMILY' | 'SUITE';
export type RoomStatus = 'AVAILABLE' | 'UNAVAILABLE';
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