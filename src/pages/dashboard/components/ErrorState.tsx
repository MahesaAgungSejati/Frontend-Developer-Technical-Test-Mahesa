interface Props {
  message: string;
  onRetry?: () => void;
}

const ErrorState = ({ message, onRetry }: Props) => {
  return (
    <div className="text-center py-10">
      <h2 className="text-lg font-semibold text-red-600">
        Terjadi kesalahan
      </h2>
      <p className="text-gray-600 mt-2">{message}</p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
};

export default ErrorState;