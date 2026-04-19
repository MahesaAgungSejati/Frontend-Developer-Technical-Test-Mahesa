interface Props {
  provider: string;
  setProvider: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  quota: string;
  setQuota: (v: string) => void;
}

const PackageFilter = ({ provider, setProvider, price, setPrice, quota, setQuota }: Props) => {
  return (
    <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 mb-8 flex flex-col md:flex-row gap-4 shadow-[0_4px_20px_rgb(0,0,0,0.02)]">
      
      {/* FILTER PROVIDER */}
      <div className="flex-1 relative">
        <label className="block text-[12px] font-bold text-gray-400 tracking-wider mb-1.5 ml-1">
          Pilih Provider
        </label>
        <div className="relative">
          <select
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all cursor-pointer"
          >
            <option value="">Semua Provider</option>
            <option value="Telkomsel">Telkomsel</option>
            <option value="Indosat">Indosat Ooredoo</option>
            <option value="XL">XL Axiata</option>
            <option value="Tri">Tri (3)</option>
            <option value="Smartfren">Smartfren</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* FILTER HARGA */}
      <div className="flex-1">
        <label className="block text-[12px] font-bold text-gray-400 tracking-wider mb-1.5 ml-1">
          Maksimal Harga
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">Rp</span>
          </div>
          <input
            type="number"
            placeholder="Contoh: 50000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all placeholder-gray-400"
          />
        </div>
      </div>

      {/* FILTER KUOTA */}
      <div className="flex-1">
       <label className="block text-[12px] font-bold text-gray-400 tracking-wider mb-1.5 ml-1">
          Minimal Kuota
        </label>
        <div className="relative">
          <input
            type="number"
            placeholder="Contoh: 10"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm font-medium rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:bg-white transition-all placeholder-gray-400"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
            <span className="text-gray-500 text-sm font-medium">GB</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PackageFilter;