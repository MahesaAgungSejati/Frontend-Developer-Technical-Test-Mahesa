import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Checkout from "../pages/checkout/Checkout";
import Success from "../pages/success/Success";
import TransactionHistory from "../pages/transactions/TransactionHistory";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/transactions" element={<TransactionHistory />} />
    </Routes>
  );
};

export default AppRoutes;