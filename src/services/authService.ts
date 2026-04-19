import api from "./api";
import type { User } from "../types/user";

export const authService = {
  login: async (email: string, password: string): Promise<User | null> => {
    const res = await api.get(`/users?email=${email}`);

    const user = res.data[0];

    if (!user) return null;

    if (user.password !== password) return null;

    return user;
  },
};