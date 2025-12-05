interface ComboBoxProps {
  label?: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function DropdownSelect({
  label,
  options,
  value,
  onChange,
  className = "",
}: ComboBoxProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`border rounded px-3 py-2 bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
