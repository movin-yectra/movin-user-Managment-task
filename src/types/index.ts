export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
}

export interface LoginResponse {
  token: string;
}

export interface AuthState {
  token: string | null;
  error: string | null;
}

export interface UsersState {
  items: User[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  auth: AuthState;
  users: UsersState;
}
