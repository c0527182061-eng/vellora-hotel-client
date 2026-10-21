import type { AdminsResponse, NewAdminRequest, User } from "../types/user"
import { api } from "./api"

const getAdmins=async()=>
{
const response=await api.get<AdminsResponse>("/admins")
return response.data.items
}

const createAdmin=async(admin:NewAdminRequest)=>
{
const response=await api.post<User>("/admins",admin)
return response.data
}

export { getAdmins, createAdmin }