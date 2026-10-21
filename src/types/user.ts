
export type Role = 'CUSTOMER' | 'ADMIN';


export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
}



export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}


export interface AuthResponse {
  token: string;
  user: User;
}


export interface MeResponse {
  user: User;
}

export type NewAdminRequest = RegisterRequest;


export interface AdminsResponse {
  items: User[];
}