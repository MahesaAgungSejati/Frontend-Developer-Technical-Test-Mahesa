import api from "./api";
import type { Package } from "../types/package";

export const packageService = {
  getPackages: async (): Promise<Package[]> => {
    const response = await api.get("/packages");
    return response.data;
  },

  getPackageById: async (id: string): Promise<Package> => {
    const response = await api.get(`/packages/${id}`);
    return response.data;
  }
};