"use client";

import { Thermometer, Wind, CloudRain, Gauge, Sun, Droplet } from "lucide-react";

export default function VariableCardStyled({ variable }: any) {
  const { variable_name, unit, last_value, last_timestamp, category } = variable;

  const icon = {
    "Meteorológica": <Sun size={32} className="text-sky-500" />,
    "Viento": <Wind size={32} className="text-indigo-500" />,
    "Humedad": <Droplet size={32} className="text-blue-400" />,
    "Lluvia": <CloudRain size={32} className="text-blue-600" />,
    "Contaminante": <Gauge size={32} className="text-red-500" />,
  }[category] ?? <Thermometer size={32} className="text-gray-500" />;

  return (
    <div className="p-4 rounded-xl shadow-md border bg-white hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        {icon}
        <span className="text-xs text-gray-400">
          {last_timestamp ? new Date(last_timestamp).toLocaleString() : ""}
        </span>
      </div>

      <h3 className="mt-2 font-semibold text-lg text-gray-700">
        {variable_name}
        <span className="text-sm text-gray-500"> ({unit})</span>
      </h3>

      <p className="text-3xl font-bold mt-3 text-sky-700">
        {last_value ?? "—"}
      </p>

      <p className="text-xs mt-1 text-gray-400">Última medición</p>
    </div>
  );
}
