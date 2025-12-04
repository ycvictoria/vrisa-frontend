"use client";

export type DateFilterOption =
  | "today"
  | "last2hours"
  | "thisweek"
  | "thismonth"
  | "custom";

export default function DateFilter({
  value,
  onChange,
}: {
  value: DateFilterOption;
  onChange: (v: DateFilterOption) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap ">
      <button
        className={`px-3 py-1 rounded ${
          value === "today" ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        onClick={() => onChange("today")}
      >
        Hoy
      </button>

      <button
        className={`px-3 py-1 rounded ${
          value === "last2hours" ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        onClick={() => onChange("last2hours")}
      >
        Últimas 2 horas
      </button>

      <button
        className={`px-3 py-1 rounded ${
          value === "thisweek" ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        onClick={() => onChange("thisweek")}
      >
        Esta semana
      </button>

      <button
        className={`px-3 py-1 rounded ${
          value === "thismonth" ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        onClick={() => onChange("thismonth")}
      >
        Este mes
      </button>

      <button
        className={`px-3 py-1 rounded ${
          value === "custom" ? "bg-sky-500 text-white" : "bg-gray-200 text-gray-400"
        }`}
        onClick={() => onChange("custom")}
      >
        Rango personalizado
      </button>
    </div>
  );
}
