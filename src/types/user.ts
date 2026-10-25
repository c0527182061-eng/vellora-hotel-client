
export type Role = 'CUSTOMER' | 'ADMIN'| 'GUEST';


export interface User {
  id: string;
  fullName: string;
  email: string;
  role: Role;
  createdAt: string;
}


export type UserContextType = {
  user: User | null;
  isLoggedIn:boolean,
  isLoading:boolean,
  login: (user: User) => void;
  logout:()=>void
};

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