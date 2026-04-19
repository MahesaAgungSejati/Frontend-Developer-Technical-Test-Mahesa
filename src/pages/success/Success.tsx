import MainLayout from "../../components/layout/MainLayout";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <MainLayout>
      <div className="max-w-md mx-auto py-12 px-4 sm:px-0">
        <div className="bg-white p-8 sm:p-10 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-50 rounded-full blur-3xl opacity-60 pointer-events-none"></div>
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-20"></div>
            <div className="relative w-full h-full bg-green-50 rounded-full flex items-center justify-center border-4 border-green-100">
              <svg 
                className="w-12 h-12 text-green-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Pembayaran Berhasil!
          </h1>
          <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8">
            Terima kasih! Transaksi Anda sedang diproses dan paket data akan segera aktif di nomor Anda.
          </p>

          <div className="border-t-2 border-dashed border-gray-100 mb-8"></div>
          <div className="flex flex-col gap-3">
            <Link
              to="/transactions"
              className="w-full bg-gray-900 text-white py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-bold hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200 transform hover:-translate-y-0.5"
            >
              Cek Status Pesanan
            </Link>
            
            <Link
              to="/dashboard"
              className="w-full bg-transparent text-gray-500 py-3.5 sm:py-4 rounded-xl text-sm sm:text-base font-semibold hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              Kembali ke Dashboard
            </Link>
          </div>

        </div>
      </div>
    </MainLayout>
  );
};

export default Success;