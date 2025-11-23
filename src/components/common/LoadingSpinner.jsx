export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-600">{message}</p>
    </div>
  );
};
