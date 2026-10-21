import type { Booking, CreateBookingRequest, DecideBookingRequest, MyBookingsQuery, AdminBookingsQuery } from "../types/booking"
import { api } from "./api"

const createBooking=async(booking:CreateBookingRequest)=>
{
const response=await api.post<Booking>("/bookings",booking)
return response.data
}

const getMyBookings=async(filters:MyBookingsQuery={})=>
{
const response=await api.get<{ items: Booking[] }>("/bookings/my",{params:{...filters,limit:50}})
return response.data.items
}

const getBookingById=async(id:string)=>
{
const response=await api.get<Booking>(`/bookings/${id}`)
return response.data
}

const getAllBookings=async(filters:AdminBookingsQuery={})=>
{
const response=await api.get<{ items: Booking[] }>("/bookings",{params:{...filters,limit:50}})
return response.data.items
}

const decideBooking=async(id:string,decision:DecideBookingRequest)=>
{
const response=await api.patch<Booking>(`/bookings/${id}/status`,decision)
return response.data
}

export { createBooking, getMyBookings, getBookingById, getAllBookings, decideBooking }