"use client";

import { useEffect, useState } from "react";
import { getStations } from "@/services/stations";
import Link from "next/link";

export default function ResearcherDashboard() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getStations()
      .then((data) => setStations(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10 text-lg">
        Cargando estaciones...
      </p>
    );

  return (
    <div className="p-10 w-full">
      {/* Título */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Tablero de Investigador
      </h1>

      {/* Botón agregar */}
      <Link
        href="/dashboard/researcher/stations/new"
        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow"
      >
        <span className="text-xl">＋</span>
        Agregar nueva estación
      </Link>

      {/* Si no hay estaciones */}
      {stations.length === 0 && (
        <p className="mt-10 text-gray-500 text-lg">
          No tienes estaciones registradas aún.
        </p>
      )}

      {/* Lista de estaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {stations.map((s) => (
          <div
            key={s.id}
            className="p-6 border rounded-xl shadow-md bg-white hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold text-gray-700">
              {s.name}
            </h2>

            <p className="text-gray-500 mt-1">
              ID: <span className="font-mono">{s.id}</span>
            </p>

            <Link
              href={`/dashboard/researcher/stations/${s.id}`}
              className="mt-4 inline-block text-blue-600 hover:underline font-medium"
            >
              Ver detalles →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
