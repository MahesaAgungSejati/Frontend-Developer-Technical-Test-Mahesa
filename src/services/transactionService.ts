import api from "./api";

export const transactionService = {
  createTransaction: async (data: any) => {
    const res = await api.post("/transactions", data);
    return res.data;
  },

  getTransactions: async () => {
    const res = await api.get("/transactions");
    return res.data;
  },

  getTransactionsByUser: async (userId: number) => {
    const res = await api.get(`/transactions?userId=${userId}`);
    return res.data;
  },
};