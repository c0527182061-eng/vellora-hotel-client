import { useMutation } from "@tanstack/react-query"
import { login, register } from "../api/auth"
import type { LoginRequest, RegisterRequest } from "../types/user"
import { createBooking, decideBooking } from "../api/booking"
import type { CreateBookingRequest, DecideBookingRequest } from "../types/booking"
import { createRoom, updateRoom } from "../api/room"
import type { RoomForm } from "../pages/roomFormPage"



export const loginUseMutation = () => {
    return useMutation(
        {
            mutationFn: (d: LoginRequest) => login(d)
        }
    )
}
export const registerUseMutation = () => {
    return useMutation(
        {
            mutationFn: (d: RegisterRequest) => register(d)
        }
    )
}

export const createBook = () => {
    return useMutation(
        {
            mutationFn: (d: CreateBookingRequest) => createBooking(d)
        }
    )
}

export const decideBooking1 = () => {
    return useMutation(
        {
            mutationFn: (d: { id: string; decision: DecideBookingRequest }) => decideBooking(d.id, d.decision),
        }
    )
}

export const roomForm = (type: string,id:string="") => {
    if (type == "add")
        return useMutation(
            {
                mutationFn: ({ image, ...room }: RoomForm) => createRoom(room,image),
            }
        )

    return useMutation(
        {
            mutationFn: ({ image, ...room }: RoomForm) => updateRoom(id,room,image),
        }
    )

}