type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;   // 👈 AÑADIMOS ESTO
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className = "",
  disabled = false,     // 👈 VALOR DEFAULT
}: ButtonProps) {
  const base = "rounded-lg shadow-sm font-medium transition";

  const variants = {
    primary: "bg-sky-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        ${base}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? "opacity-50 cursor-not-allowed hover:none" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
