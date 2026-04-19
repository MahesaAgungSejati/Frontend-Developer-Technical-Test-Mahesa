import type { Package } from "../../../types/package";
import { useNavigate } from "react-router-dom";

// Import logo sesuai dengan yang ada di assets Anda
import logoIndosat from "../../../assets/logo provider/indosat.jpg";
import logoSmartfren from "../../../assets/logo provider/smartfren.jpg";
import logoTelkomsel from "../../../assets/logo provider/telkomsel.jpg";
import logoTri from "../../../assets/logo provider/TRI.jpg";
import logoXL from "../../../assets/logo provider/XL.jpg";

const getProviderLogo = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes("indosat")) return logoIndosat;
  if (p.includes("smartfren")) return logoSmartfren;
  if (p.includes("telkomsel")) return logoTelkomsel;
  if (p.includes("tri") || p.includes("3")) return logoTri;
  if (p.includes("xl")) return logoXL;
  return "https://via.placeholder.com/150?text=Logo"; 
};

const PackageModal = ({
  pkg,
  onClose,
}: {
  pkg: Package;
  onClose: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* MODAL CONTAINER */}
      <div 
        className="bg-white w-full max-w-[420px] rounded-[2rem] shadow-2xl relative border border-gray-100 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* TOMBOL CLOSE (X) */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-full transition-colors z-10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* ISI MODAL */}
        <div className="p-6 sm:p-8 pt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-100 flex-shrink-0 bg-gray-50">
              <img 
                src={getProviderLogo(pkg.provider)} 
                alt={`Logo ${pkg.provider}`} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-0.5">{pkg.provider}</p>
              <h2 className="text-xl font-bold text-gray-900 leading-tight">
                {pkg.name}
              </h2>
            </div>
          </div>

          <div className="bg-gray-50/80 border border-gray-100 rounded-2xl p-5 mb-6">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total Kuota</p>
            <div className="flex items-baseline gap-1 mb-3">
              <span className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                {pkg.quota}
              </span>
              <span className="text-lg font-bold text-gray-500">GB</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              {pkg.description}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium text-gray-500 mb-1">Harga Paket</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight mb-6">
              Rp {pkg.price.toLocaleString("id-ID")}
            </p>

            <button
              onClick={() => navigate(`/checkout?packageId=${pkg.id}`)}
              className="w-full bg-gray-900 text-white px-4 py-3.5 rounded-xl text-base font-semibold hover:bg-gray-800 transition-all focus:ring-4 focus:ring-gray-200 transform hover:-translate-y-0.5"
            >
              Lanjutkan ke Pembayaran
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageModal;