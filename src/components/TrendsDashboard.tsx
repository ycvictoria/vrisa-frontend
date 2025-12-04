"use client";

import React from "react";

type Props = {
  role?: string | null;
};

function KPICard({ title, value, subtitle }: any) {
  return (
    <div className="rounded-xl border p-5 shadow-sm bg-white">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-semibold mt-3">{value}</p>
      {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
    </div>
  );
}

export default function TrendsDashboard({ role }: Props) {
  // datos mock (en producción vendrían desde API)
  const kpis = [
    { title: "Estaciones Operativas", value: "18/20" },
    { title: "Alertas Activas", value: 5 },
    { title: "Mantenimientos Pendientes", value: 2 },
    { title: "Calidad del Aire Promedio", value: "Buena" },
  ];

  const alerts = [
    { station: "Estación Centro", ubication: "Plaza Mayor", type: "PM2.5 Elevado", severity: "Crítica", time: "Hace 5 min" },
    { station: "Estación Norte", ubication: "Parque de la Paz", type: "Ozono Alto", severity: "Moderada", time: "Hace 30 min" },
    { station: "Estación Sur", ubication: "Zona Industrial", type: "CO Anormal", severity: "Leve", time: "Hace 1 hora" },
  ];

  // helper simple para estilizar severidad
  const severityClass = (s: string) => {
    if (!s) return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs";
    if (s.toLowerCase().includes("crít")) return "bg-red-500 text-white px-3 py-1 rounded-full text-xs";
    if (s.toLowerCase().includes("moder")) return "bg-yellow-200 text-gray-800 px-3 py-1 rounded-full text-xs";
    return "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-bold">Tendencias, Alertas y Mantenimiento</h1>
        <p className="text-gray-600">Un resumen de tendencias y alertas de sus estaciones de monitoreo.</p>
      </header>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <KPICard key={k.title} {...k} />
        ))}
      </div>

      {/* Tabla de alertas */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Estaciones con Alertas Recientes</h3>

          {/* botones: ver histórico - solo para institucion/investigador */}
          {(role === "institucion" || role === "investigador" || role === "institution" || role === "investigator") && (
            <div className="flex gap-2">
              <button className="px-4 py-1 bg-indigo-500 text-white rounded">Ver Historial de Alertas</button>
              <button className="px-4 py-1 bg-indigo-500 text-white rounded">Ver Mantenimientos</button>
            </div>
          )}
        </div>

        <table className="w-full text-left">
          <thead className="text-sm text-gray-600">
            <tr>
              <th className="p-3">Estación</th>
              <th className="p-3">Ubicación</th>
              <th className="p-3">Tipo de Alerta</th>
              <th className="p-3">Severidad</th>
              <th className="p-3">Marca de Tiempo</th>
            </tr>
          </thead>

          <tbody>
            {alerts.map((a, i) => (
              <tr key={i} className="border-t">
                <td className="p-3">{a.station}</td>
                <td className="p-3">{a.ubication}</td>
                <td className="p-3">{a.type}</td>
                <td className="p-3"><span className={severityClass(a.severity)}>{a.severity}</span></td>
                <td className="p-3">{a.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico placeholder (reemplazar por Recharts/Chart.js) */}
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Tendencias de Calidad Ambiental</h3>
          <select className="border rounded px-3 py-1">
            <option>Últimos 7 días</option>
            <option>Últimos 30 días</option>
            <option>Últimos 12 meses</option>
          </select>
        </div>

        {/* aquí puedes integrar Recharts o cualquier librería; por ahora placeholder */}
        <div className="h-64 flex items-center justify-center text-gray-400">
          [Gráfico de líneas — integrar Recharts/Chart.js en producción]
        </div>
      </div>
    </div>
  );
}
