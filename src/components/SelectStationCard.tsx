"use client";

import { MapPin } from "lucide-react";
import { Subtitle } from "./Text";

interface Props {
  name: string;
  location: string;
  status: string;
  lastUpdate: string;
  sensors: number;
  alerts?: number;
  title:string;
  stationId: number;
  onJoin: () => void;
}

export default function SelectStationCard({
  name,
  location,
  status,
  lastUpdate,
  sensors,
  alerts = 0,
  onJoin, title, stationId
}: Props) {
  
  const statusColor =
    status === "active"
      ? "text-green-600 bg-green-100"
      : status === "inactive"
      ? "text-red-600 bg-red-100"
      : "text-yellow-600 bg-yellow-100";

  return (
    <div className="border rounded-xl p-4 mb-5 shadow-sm hover:shadow-md transition bg-white w-[330px]">

      {/* ALERTAS */}
      {alerts > 0 && (
        <span className="text-white text-xs px-2 py-1 bg-red-500 rounded-full float-right">
          {alerts} alertas
        </span>
      )}

      {/* TÍTULO */}
      <Subtitle className="text-sky-600">{name}</Subtitle>

      <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
        <MapPin size={16} className="text-gray-400" />
        {location}
      </p>
<p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
       
       Id: {stationId}
      </p>
      {/* ESTADO + FECHA */}
      <div className="flex justify-between items-center mt-3">
        <span className={`px-3 py-1 text-sm rounded-full font-medium ${statusColor}`}>
          {status}
        </span>

        <span className="text-xs text-gray-500">
          Inicio: {lastUpdate}
        </span>
      </div>
<button
  onClick={() => {
    if (title === "Ver data") {
      window.location.href = `/dashboard/station/${stationId}`;
    } else {
      onJoin?.(); // ejecuta el join solo si existe
    }
  }}
  className="mt-4 w-full bg-sky-500 hover:bg-sky-600 text-white font-medium py-2 rounded-lg"
>
  {title}
</button>
    </div>
  );
}
