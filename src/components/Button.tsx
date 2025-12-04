import React from "react";
import clsx from "clsx";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function Button({
  variant = "primary",
  size = "md",
  children,
  onClick,
  className,
}: ButtonProps) {
  const base = "rounded-lg shadow-sm font-medium transition";

  const variants = {
    primary: "bg-sky-600 text-white hover:bg-indigo-700",
    secondary: "bg-gray-200 text-gray-700 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

 
  return (
    <button
      onClick={onClick}
      className={clsx(base, variants[variant], sizes[size], className)}
    >
      {children}
    </button>
  );
}
