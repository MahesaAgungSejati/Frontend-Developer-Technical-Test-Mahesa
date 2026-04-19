interface Props {
  page: number;
  total: number;
  setPage: (p: number) => void;
}

const Pagination = ({ page, total, setPage }: Props) => {
  if (total <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 sm:gap-3 mt-12 mb-8">
      
      {/* TOMBOL SEBELUMNYA */}
      <button
        onClick={() => setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-all"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:block">Sebelumnya</span>
      </button>

      {/* NOMOR HALAMAN */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const pageNumber = i + 1;
          const isActive = page === pageNumber;
          
          return (
            <button
              key={i}
              onClick={() => setPage(pageNumber)}
              className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-semibold transition-all duration-200 ${
                isActive 
                  ? "bg-gray-900 text-white shadow-md transform scale-105" 
                  : "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      {/* TOMBOL SELANJUTNYA */}
      <button
        onClick={() => setPage(Math.min(total, page + 1))}
        disabled={page === total}
        className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 h-10 rounded-xl border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50 disabled:pointer-events-none transition-all"
      >
        <span className="hidden sm:block">Selanjutnya</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
    </div>
  );
};

export default Pagination;