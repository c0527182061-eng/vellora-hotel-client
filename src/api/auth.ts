import type { HealthResponse } from "../types/common"
import type { AuthResponse ,RegisterRequest, LoginRequest, MeResponse} from "../types/user"
import { api } from "./api"



const getHealth=async()=>
{
const response=await api.get<HealthResponse>("/health")
return response.data
}


const register=async(user:RegisterRequest)=>
{
const response=await api.post<AuthResponse>("/auth/register",user)
return response.data
}

const login=async(user:LoginRequest)=>
{
const response=await api.post<AuthResponse>("/auth/login",user)
return response.data
}

const getCurrentUser=async()=>
{
const response=await api.get<MeResponse>("/auth/me")
return response.data.user
}

export {getHealth, register, login, getCurrentUser }



