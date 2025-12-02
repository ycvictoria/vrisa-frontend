"use client";

import React from "react";

export default function InvestigatorDashboard() {
  const stations = [
    {
      id: 1,
      name: "Univalle San Fernando",
      location: "Univalle SF. Edificio 20",
      status: "Active",
      alerts: 2,
      lastUpdate: "2023-10-26 14:15",
      sensors: 3,
    },
    {
      id: 2,
      name: "Cañaveralejo",
      location: "Cali Sur",
      status: "Active",
      alerts: 0,
      lastUpdate: "2023-10-26 14:30",
      sensors: 5,
    },
    {
      id: 3,
      name: "La Ermita",
      location: "La Ermita, CO",
      status: "Active",
      alerts: 0,
      lastUpdate: "2023-10-26 10:00",
      sensors: 4,
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Tablero de Investigador</h1>
      <p className="text-gray-600 mb-6">
        Un resumen de sus estaciones de monitoreo, con indicadores de alertas activas.
      </p>

      {/* BOTONES SUPERIORES */}
      <div className="flex gap-4 mb-6">
        <button className="px-4 py-2 rounded bg-red-300 text-red-900">
          🗑️ Eliminar Estación de la Red
        </button>

        <button className="px-4 py-2 rounded bg-indigo-500 text-white">
          🖥️ + Agregar Nueva Estación
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Mis Estaciones Monitoreadas</h2>

      {/* GRID DE ESTACIONES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stations.map((st) => (
          <div
            key={st.id}
            className="border rounded p-4 shadow-sm hover:shadow-md transition"
          >
            {/* Checkbox superior */}
            <div className="flex justify-between items-center mb-2">
              <input type="checkbox" className="w-4 h-4" />

              {st.alerts > 0 && (
                <span className="text-white bg-red-500 px-2 py-1 rounded text-sm">
                  ⚠ {st.alerts} Alertas
                </span>
              )}
            </div>

            {/* Nombre y ubicación */}
            <h3 className="text-lg font-semibold">{st.name}</h3>
            <p className="text-gray-500 text-sm">📍 {st.location}</p>

            {/* Estado */}
            <div className="mt-2">
              <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-xs">
                ✔ {st.status}
              </span>
            </div>

            {/* Info adicional */}
            <div className="text-xs text-gray-500 mt-3">
              Last Update: {st.lastUpdate} <br />
              Sensors: {st.sensors}
            </div>

            {/* Botón de detalles */}
            <button className="w-full mt-4 border rounded py-1 hover:bg-gray-50 transition">
              Ver Detalles
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
