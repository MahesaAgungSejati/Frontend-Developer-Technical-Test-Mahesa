const EmptyState = () => {
  return (
    <div className="text-center py-10">
      <h2 className="text-lg font-semibold text-gray-700">
        Paket tidak ditemukan
      </h2>
      <p className="text-gray-500 mt-2">
        Coba ubah filter atau cari paket lainnya
      </p>
    </div>
  );
};

export default EmptyState;