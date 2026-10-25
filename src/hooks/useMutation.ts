import { useMutation } from "@tanstack/react-query"
import { login, register } from "../api/auth"
import type { LoginRequest, RegisterRequest } from "../types/user"



export const loginUseMutation = () => {
   return useMutation(
        {
            mutationFn:(d:LoginRequest)=>login(d)
        }
    )  
}
export const registerUseMutation = () => {
   return useMutation(
        {
            mutationFn:(d:RegisterRequest)=>register(d)
        }
    )  
}