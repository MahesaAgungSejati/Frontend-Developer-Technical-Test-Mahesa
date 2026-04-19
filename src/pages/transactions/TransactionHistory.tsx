import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { transactionService } from "../../services/transactionService";
import { packageService } from "../../services/packageService";
import { useAuth } from "../../context/AuthContext";

import logoIndosat from "../../assets/logo provider/indosat.jpg";
import logoSmartfren from "../../assets/logo provider/smartfren.jpg";
import logoTelkomsel from "../../assets/logo provider/telkomsel.jpg";
import logoTri from "../../assets/logo provider/TRI.jpg";
import logoXL from "../../assets/logo provider/XL.jpg";

const getProviderLogo = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes("indosat")) return logoIndosat;
  if (p.includes("smartfren")) return logoSmartfren;
  if (p.includes("telkomsel") || p.includes("by.u")) return logoTelkomsel;
  if (p.includes("tri") || p.includes("3")) return logoTri;
  if (p.includes("xl")) return logoXL;
  return "https://via.placeholder.com/150?text=Logo"; 
};

const formatPayment = (method: string) => {
  const m = method.toLowerCase();
  if (m === "gopay") return "GoPay";
  if (m === "ovo") return "OVO";
  if (m === "qris" || m === "bank") return "QRIS / Virtual Account";
  return method;
};

const TransactionHistory = () => {
  const { user } = useAuth();

  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return;

      setLoading(true);

      try {
        const data = await transactionService.getTransactions();

        const safeData = data.filter(
          (trx: any) => String(trx.userId) === String(user.id)
        );

        const enriched = await Promise.all(
          safeData.map(async (trx: any) => {
            const pkg = await packageService.getPackageById(trx.packageId);

            return {
              ...trx,
              packageName: pkg?.name || "Paket Tidak Diketahui",
              provider: pkg?.provider || "-",
              quota: pkg?.quota || 0,
              phoneNumber: trx.phoneNumber || "-", 
            };
          })
        );

        setTransactions(enriched.reverse());
      } catch (err) {
        console.log("Gagal mengambil riwayat", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?.id]);

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-0">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Riwayat Transaksi
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Pantau semua aktivitas pembelian paket data Anda di sini.
            </p>
          </div>
        </div>

        {/* STATE: LOADING SKELETON */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 animate-pulse flex flex-col sm:flex-row gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-3 py-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* STATE: EMPTY DATA */}
        {!loading && transactions.length === 0 && (
          <div className="bg-white rounded-[2rem] border border-gray-100 py-20 px-6 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Transaksi</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Anda belum melakukan pembelian paket data. Yuk, temukan paket yang cocok untukmu!
            </p>
            <Link 
              to="/dashboard"
              className="inline-flex bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Beli Paket Sekarang
            </Link>
          </div>
        )}

        {/* STATE: DATA READY */}
        {!loading && transactions.length > 0 && (
          <div className="space-y-4 sm:space-y-5">
            {transactions.map((trx) => (
              <div
                key={trx.id}
                className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-shadow duration-300 relative overflow-hidden"
              >

                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
                      <img src={getProviderLogo(trx.provider)} alt={trx.provider} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-tight mb-1">
                        {trx.packageName}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 font-medium">
                        {trx.provider} <span className="mx-1.5 text-gray-300">•</span> {trx.quota} GB
                      </p>
                    </div>
                  </div>

                  <div className="text-left sm:text-right mt-2 sm:mt-0 ml-16 sm:ml-0">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Total Belanja</p>
                    <p className="text-lg font-bold text-gray-900">
                      Rp {Number(trx.price).toLocaleString("id-ID")}
                    </p>
                  </div>

                </div>
                <div className="mt-5 pt-4 border-t border-dashed border-gray-200 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-gray-50/50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-5 sm:p-6">
                  
                  <div className="flex flex-wrap gap-5 sm:gap-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Nomor Tujuan</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {trx.phoneNumber || "-"}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Metode</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {formatPayment(trx.paymentMethod || "-")}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1">
                      <span className="text-xs text-gray-500">Kode Pembayaran</span>
                      <span className="text-sm font-mono font-medium text-gray-700 bg-white px-2 py-0.5 rounded border border-gray-200">
                        {trx.paymentCode || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="absolute top-5 right-5 sm:static">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-100">
                      Berhasil
                    </span>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </MainLayout>
  );
};

export default TransactionHistory;