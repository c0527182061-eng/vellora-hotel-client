import { useQuery } from "@tanstack/react-query"
import { getRoomById, getRooms } from "../api/room"
import type {  RoomsQuery } from "../types/room"
import { getAllBookings, getMyBookings } from "../api/booking"
import type { MyBookingsQuery } from "../types/booking"






export const getRoomsUseQuery= (key: string,filter:Omit<RoomsQuery, "status">={}) => {
    return useQuery(
        {
            queryKey: [key,filter],
            queryFn: () =>getRooms(filter)
        }
    )
}

export const getRoomsById= (key:string) => {
    return useQuery(
        {
            queryKey: ["getRoomById",key],
            queryFn: () =>getRoomById(key)
        }
    )
}


export const getMyBookings1= (userId:string="",filter:MyBookingsQuery={}) => {
    return useQuery(
        {
            queryKey: ["getMyBookings",filter,userId],
            queryFn: () =>getMyBookings()
        }
    )
}



export const getAllBookings1= () => {
    return useQuery(
        {
            queryKey: ["getAllBookings"],
            queryFn: () =>getAllBookings()
        }
    )
}


export const getAllRooms1= (filter:RoomsQuery={}) => {
    return useQuery(
        {
            queryKey: ["getAllRooms",filter],
            queryFn: () =>getRooms(filter)
        }
    )
}