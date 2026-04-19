export interface Transaction {
  id?: number;
  packageId: number;
  packageName: string;
  price: number;
  phone: string;
  createdAt: string;
  status: "success" | "pending" | "failed";
}