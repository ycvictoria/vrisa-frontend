"use client";

import { useEffect, useState } from "react";

interface Variable {
  variable: string;
  value: number;
  unit: string;
  timestamp: string;
}

interface Station {
  station_name: string;
  latitude: number;
  longitude: number;
  variables: Variable[];
}

export default function CitizenPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await fetch("/api/public/citizen");
        if (!res.ok) throw new Error("Error al cargar las estaciones");
        const data = await res.json();
        console.log(data);
        setStations(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStations();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
        Cargando datos de las estaciones...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        ❌ Error: {error}
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🌎 Información pública de estaciones
      </h1>

      {stations.length === 0 ? (
        <p className="text-center text-gray-500">
          No hay datos disponibles en este momento.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stations.map((station, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-5 border border-gray-200"
            >
              <h2 className="text-xl font-semibold text-blue-600 mb-2">
                {station.station_name}
              </h2>

              <p className="text-sm text-gray-500 mb-2">
                📍 Lat: {station.latitude.toFixed(3)} | Lon:{" "}
                {station.longitude.toFixed(3)}
              </p>

              <div className="border-t border-gray-300 my-3"></div>

              <h3 className="text-sm font-bold text-gray-700 mb-2">
                Variables registradas:
              </h3>

              <ul className="space-y-2">
                {station.variables.slice(0, 3).map((v, i) => (
                  <li
                    key={i}
                    className="flex justify-between text-sm bg-blue-50 p-2 rounded-md"
                  >
                    <span className="font-medium text-gray-700">
                      {v.variable}
                    </span>
                    <span className="text-gray-900">
                      {v.value} {v.unit}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="text-xs text-gray-400 mt-3">
                Última actualización:{" "}
                {new Date(
                  station.variables[0]?.timestamp ?? ""
                ).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
