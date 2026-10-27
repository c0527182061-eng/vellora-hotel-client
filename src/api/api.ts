
import axios from "axios"

const serverUrl = import.meta.env.VITE_API_URL

if (!serverUrl) {
    throw new Error("VITE_API_URL is missing")
}

export const api = axios.create({
    baseURL: serverUrl + "/api"
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
api.interceptors.response.use(
    response => response,
    error => {
        const url = error.config?.url ?? ""
        const isAuthRequest = url.includes("/auth/login") || url.includes("/auth/me")

        if (error.response?.status === 401 && !isAuthRequest) {
            localStorage.removeItem("token")
            window.location.href = "/login"
        }
        return Promise.reject(error)
    }
)

