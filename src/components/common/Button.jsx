export const Button = ({
  children,
  variant = "primary",
  type = "button",
  disabled = false,
  onClick,
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
