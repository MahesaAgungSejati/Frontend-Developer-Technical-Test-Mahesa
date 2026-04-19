import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layout/MainLayout";
import { packageService } from "../../services/packageService";
import { transactionService } from "../../services/transactionService";
import { useAuth } from "../../context/AuthContext";
import type { Package } from "../../types/package";

// IMPORT LOGO PROVIDER
import logoIndosat from "../../assets/logo provider/indosat.jpg";
import logoSmartfren from "../../assets/logo provider/smartfren.jpg";
import logoTelkomsel from "../../assets/logo provider/telkomsel.jpg";
import logoTri from "../../assets/logo provider/TRI.jpg";
import logoXL from "../../assets/logo provider/XL.jpg";

// IMPORT LOGO PAYMENT
import logoGopay from "../../assets/logo payment/gopay.jpg";
import logoOvo from "../../assets/logo payment/ovo.jpg";
import logoQris from "../../assets/logo payment/qris logo.jpg";

const getProviderLogo = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes("indosat")) return logoIndosat;
  if (p.includes("smartfren")) return logoSmartfren;
  if (p.includes("telkomsel") || p.includes("by.u")) return logoTelkomsel;
  if (p.includes("tri") || p.includes("3")) return logoTri;
  if (p.includes("xl")) return logoXL;
  return "https://via.placeholder.com/150?text=Logo"; 
};

// DAFTAR OPSI PEMBAYARAN MENGGUNAKAN GAMBAR
const PAYMENT_OPTIONS = [
  { id: "gopay", label: "GoPay", img: logoGopay },
  { id: "ovo", label: "OVO", img: logoOvo },
  { id: "qris", label: "QRIS", img: logoQris },
];

const Checkout = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const packageId = params.get("packageId");

  const [pkg, setPkg] = useState<Package | null>(null);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // 🔥 STATE BARU UNTUK NOMOR HP
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentCode, setPaymentCode] = useState("");

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await packageService.getPackageById(packageId!);
        setPkg(data);
      } catch (err) {
        console.error("Gagal mengambil data paket", err);
      } finally {
        setLoadingFetch(false);
      }
    };
    if (packageId) fetch();
  }, [packageId]);

  // AUTO GENERATE PAYMENT CODE SAAT METHOD DIPILIH
  useEffect(() => {
    if (!paymentMethod) {
      setPaymentCode("");
      return;
    }
    const generateCode = () => {
      if (paymentMethod === "gopay") return "GOPAY-123456789";
      if (paymentMethod === "ovo") return "OVO-123456789";
      if (paymentMethod === "qris") return "QRIS-123456789";
      return "";
    };
    setPaymentCode(generateCode());
  }, [paymentMethod]);

  const handleCheckout = async () => {
    if (!pkg || !user) return;
    
    // 🔥 VALIDASI NOMOR HP
    if (!phoneNumber) {
      alert("Nomor HP wajib diisi");
      return;
    }

    if (!paymentMethod || !paymentCode) {
      alert("Pilih metode pembayaran terlebih dahulu");
      return;
    }

    try {
      setLoadingSubmit(true);
      await transactionService.createTransaction({
        packageId: pkg.id,
        userId: user.id,
        price: pkg.price,
        paymentMethod,
        paymentCode,
        phoneNumber,
      });
      navigate("/success"); 
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat memproses pembayaran.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  // TAMPILAN LOADING SKELETON
  if (loadingFetch) {
    return (
      <MainLayout>
        <div className="max-w-xl mx-auto mt-8 animate-pulse">
          <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
          <div className="bg-white p-8 rounded-[2rem] border border-gray-100 h-[500px]"></div>
        </div>
      </MainLayout>
    );
  }

  if (!pkg) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold mb-4">Paket Tidak Valid</h2>
          <button onClick={() => navigate("/dashboard")} className="text-blue-600 underline">Kembali ke Dashboard</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-xl mx-auto py-8 px-4 sm:px-0">
        
        {/* Header & Back Button */}
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Selesaikan Pembayaran</h1>
        </div>

        <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* SECTION 1: RINCIAN PESANAN */}
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Rincian Pesanan</h2>
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-white flex-shrink-0">
                <img src={getProviderLogo(pkg.provider)} alt={pkg.provider} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{pkg.name}</h3>
                <p className="text-sm text-gray-500">{pkg.provider} • {pkg.quota} GB</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mb-0.5">Total</p>
              <p className="font-bold text-gray-900 whitespace-nowrap">Rp {pkg.price.toLocaleString("id-ID")}</p>
            </div>
          </div>

          {/* SECTION 2: NOMOR HP TUJUAN */}
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 mt-8">Nomor HP Tujuan</h2>
          <div className="mb-8 relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            </div>
            <input
              type="tel"
              placeholder="Contoh: 081234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-2xl pl-11 pr-4 py-4 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all placeholder-gray-400"
            />
            <p className="text-[11px] font-medium text-gray-500 mt-2 ml-1">
              Paket data akan langsung diaktifkan ke nomor ini. Pastikan nomor sudah benar.
            </p>
          </div>

          {/* SECTION 3: METODE PEMBAYARAN */}
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Metode Pembayaran</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {PAYMENT_OPTIONS.map((option) => {
              const isSelected = paymentMethod === option.id;
              return (
                <div
                  key={option.id}
                  onClick={() => setPaymentMethod(option.id)}
                  className={`cursor-pointer rounded-xl p-3 border-2 flex flex-col items-center justify-center text-center gap-2 transition-all duration-200 ${
                    isSelected 
                      ? "border-gray-900 bg-gray-900/5 shadow-sm" 
                      : "border-gray-100 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <div className="h-8 flex items-center justify-center mb-1">
                    <img 
                      src={option.img} 
                      alt={option.label} 
                      className="max-h-full max-w-[60px] object-contain rounded" 
                    />
                  </div>
                  <span className={`text-xs font-semibold ${isSelected ? "text-gray-900" : "text-gray-500"}`}>
                    {option.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* SECTION 4: KODE PEMBAYARAN (MUNCUL JIKA SUDAH PILIH METODE) */}
          {paymentCode && (
            <div className="mb-8 animate-fade-in">
              <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">
                {paymentMethod === 'qris' ? 'Silakan Scan QRIS' : 'Kode Pembayaran'}
              </h2>
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center relative group">
                <p className="text-xs text-gray-500 mb-1">
                  {paymentMethod === 'qris' 
                    ? 'Buka aplikasi dompet digital / m-banking Anda' 
                    : `Gunakan kode ini pada aplikasi ${PAYMENT_OPTIONS.find(o => o.id === paymentMethod)?.label}`
                  }
                </p>
                <p className="font-mono text-2xl font-bold text-gray-900 tracking-widest mt-2">
                  {paymentCode}
                </p>
              </div>
            </div>
          )}

          {/* SECTION 5: BUTTON SUBMIT */}
          <div className="pt-6 border-t border-gray-100">
            <button
              onClick={handleCheckout}
              disabled={loadingSubmit || !paymentCode || !phoneNumber}
              className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-gray-800 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-all focus:ring-4 focus:ring-gray-200"
            >
              {loadingSubmit ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </span>
              ) : (
                "Cek Pembayaran"
              )}
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;