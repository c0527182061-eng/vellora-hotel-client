
import type { Room, RoomFormFields, RoomUpdateFields, RoomsQuery } from "../types/room"
import { api } from "./api"

const getRooms=async(filters:RoomsQuery={})=>
{
const response=await api.get<{ items: Room[] }>("/rooms",{params:{...filters,limit:50}})
return response.data.items
}

const getRoomById=async(id:string)=>
{
const response=await api.get<Room>(`/rooms/${id}`)
return response.data
}

const createRoom=async(room:RoomFormFields,image?:File)=>
{
const formData=new FormData()
Object.entries(room).forEach(([key,value])=>formData.append(key,String(value)))
if(image) formData.append("image",image)
const response=await api.post<Room>("/rooms",formData)
return response.data
}

const updateRoom=async(id:string,room:RoomUpdateFields,image?:File)=>
{
const formData=new FormData()
Object.entries(room).forEach(([key,value])=>formData.append(key,String(value)))
if(image) formData.append("image",image)
const response=await api.patch<Room>(`/rooms/${id}`,formData)
return response.data
}

const deleteRoom=async(id:string)=>
{
await api.delete(`/rooms/${id}`)
}

export { getRooms, getRoomById, createRoom, updateRoom, deleteRoom }


