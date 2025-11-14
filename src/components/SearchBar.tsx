"use client";

import { useState } from "react";
import { Search } from "lucide-react";

type SearchBarProps = {
  placeholder?: string;
  onSearch: (value: string) => void;
  defaultValue?: string;
};

export default function SearchBar({
  placeholder = "Buscar...",
  onSearch,
  defaultValue = "",
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    onSearch(v);
  };

  return (
    <div className="relative w-full max-w-sm">
      {/* Icono */}
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

      {/* Input */}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="
          w-full pl-10 pr-4 py-2 rounded-xl 
          border border-gray-300 
          focus:border-indigo-500 focus:ring-2 focus:ring-indigo-300
          transition outline-none
          text-sm text-gray-700
        "
      />
    </div>
  );
}
