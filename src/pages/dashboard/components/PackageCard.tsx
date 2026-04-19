import type { Package } from "../../../types/package";
import logoIndosat from "../../../assets/logo provider/indosat.jpg";
import logoSmartfren from "../../../assets/logo provider/smartfren.jpg";
import logoTelkomsel from "../../../assets/logo provider/telkomsel.jpg";
import logoTri from "../../../assets/logo provider/TRI.jpg";
import logoXL from "../../../assets/logo provider/XL.jpg";

const getProviderLogo = (provider: string) => {
  const p = provider.toLowerCase();
  if (p.includes("indosat")) return logoIndosat;
  if (p.includes("smartfren")) return logoSmartfren;
  if (p.includes("telkomsel") || p.includes("by.u")) return logoTelkomsel;
  if (p.includes("tri") || p.includes("3")) return logoTri;
  if (p.includes("xl")) return logoXL;
  
  return "https://via.placeholder.com/150?text=Logo"; 
};

const PackageCard = ({
  item,
  onClick,
}: {
  item: Package;
  onClick: (pkg: Package) => void;
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 p-5 sm:p-6 flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300">
      <div className="flex justify-between items-start mb-5">
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex-shrink-0">
          <img 
            src={getProviderLogo(item.provider)} 
            alt={`Logo ${item.provider}`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* BODY: Provider, Title, & Tags */}
      <div className="mb-6 flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-900 font-medium mb-1.5">
          {item.provider}
          <span className="text-gray-400 text-xs font-normal">• Tersedia</span>
        </div>
        
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight mb-4">
          {item.name}
        </h3>

        <div className="flex flex-wrap gap-2">
          <span className="px-2.5 py-1 bg-gray-100/80 text-gray-700 text-xs font-medium rounded-md">
            {item.quota} GB
          </span>
          <span className="px-2.5 py-1 bg-gray-100/80 text-gray-700 text-xs font-medium rounded-md truncate max-w-[150px]">
            {item.description}
          </span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-auto gap-4">
        <div>
          <div className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
            Rp {item.price.toLocaleString("id-ID")}
          </div>
          <div className="text-[11px] sm:text-xs text-gray-400 font-medium mt-0.5">
            Harga Spesial
          </div>
        </div>
        
        {/* Tombol Action */}
        <button 
          onClick={() => onClick(item)}
          className="bg-gray-900 text-white px-5 sm:px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Beli Paket
        </button>
      </div>
      
    </div>
  );
};

export default PackageCard;