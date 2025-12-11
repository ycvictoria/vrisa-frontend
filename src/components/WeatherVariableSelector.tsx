"use client";

interface WeatherVariableSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export default function WeatherVariableSelect({
  value,
  onChange,
}: WeatherVariableSelectProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">
        Variable meteorológica
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Seleccione una variable</option>

        {/* Variables meteorológicas */}
        <option value="temperatura">Temperatura (°C)</option>
        <option value="humedad">Humedad (%)</option>
        <option value="presion">Presión atmosférica (hPa)</option>
        <option value="viento">Velocidad del viento (m/s)</option>
        <option value="direccion_viento">Dirección del viento (°)</option>
        <option value="precipitacion">Precipitación (mm)</option>
        <option value="radiacion">Radiación solar (W/m²)</option>

        {/* Contaminantes */}
        <option value="pm25">PM2.5 (µg/m³)</option>
        <option value="pm10">PM10 (µg/m³)</option>
        <option value="co">CO (ppm)</option>
        <option value="ozono">O₃ (ppb)</option>
        <option value="no2">NO₂ (ppb)</option>
      </select>
    </div>
  );
}
