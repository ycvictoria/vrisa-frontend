import { MapPin } from "lucide-react";
import { Subtitle } from "./Text";

interface StationCardProps {
  name: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  lastUpdate: string;
  sensors: number;
  alerts?: number;
}

export function StationCard({
  name,
  location,
  status,
  lastUpdate,
  sensors,
  alerts = 0,
}: StationCardProps) {
  const statusColor =
    status === "active"
      ? "text-green-600 bg-green-100"
      : status === "inactive"
      ? "text-red-600 bg-red-100"
      : "text-yellow-600 bg-yellow-100";

  return (
    <div className="border rounded-xl p-4 shadow-sm hover:shadow-md transition bg-white w-[330px]">
      {/* Checkbox + alertas */}
      <div className="flex justify-between items-center mb-3">
        <input type="checkbox" className="w-4 h-4 cursor-pointer" />

        {alerts > 0 && (
          <span className="text-white text-sm px-3 py-1 bg-red-400 rounded-full">
            {alerts} Alertas
          </span>
        )}
      </div>

      {/* Título */}
      <Subtitle>{name}</Subtitle>

      {/* Ubicación */}
      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
        <MapPin size={16} className="text-gray-400" /> {location}
      </p>

    <div className="flex justify-between items-center">
    {/* Estado  y Fecha inicio*/}
      <div className="mt-3 flex-row justify-between gap-4 ">
      
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
       <span
          className={`px-3 py-1 text-xs text-gray-500 mt-3  `}
        >Fecha Inicio: {lastUpdate}
        </span>
     </div>
     
      {/* Sensores */}
      <p className="text-xs text-gray-500 px-1 py-1 mt-2">Número de Sensores: {sensors}</p>

      {/* Botón */}
      <button className="mt-4 w-full bg-gray-100 hover:bg-sky-200 text-sky-700 font-medium py-2 rounded-lg">
        Ver Estación
      </button>
    </div>
  );
}
