import axios from "axios";
import { LoginResponse, User } from "../types";

const api = axios.create({
  baseURL: "https://reqres.in/api",
  headers: {
    "x-api-key": "reqres-free-v1",
  },
});

export const loginApi = (email: string, password: string) =>
  api.post<LoginResponse>("/login", { email, password });

export const getUsersPage = (page = 1) =>
  api.get<{ data: User[]; total_pages: number }>("/users", {
    params: { page },
  });

export const createUserApi = (payload: Partial<User>) =>
  api.post("/users", payload);

export const updateUserApi = (id: number, payload: Partial<User>) =>
  api.put(`/users/${id}`, payload);

export const deleteUserApi = (id: number) => api.delete(`/users/${id}`);
