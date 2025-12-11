"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { Title, Subtitle, Paragraph } from "@/components/Text";
import {
  getStationAlerts,
  getStationMaintenance,
} from "@/services/alerts_maintenance";
import { getEstacionNombre } from "@/services/stations";
import Link from "next/link";





export default function AlertsAndMaintenancePage() {
  const params = useParams();
  const idStation = Number(params.id);

  const [alerts, setAlerts] = useState<any[]>([]);
  const [maintenance, setMaintenance] = useState<any[]>([]);
  const [stationName, setStationName] = useState<string>("");

  useEffect(() => {
    async function load() {
      const n = await getEstacionNombre(idStation);
      const a = await getStationAlerts(idStation);
      const m = await getStationMaintenance(idStation);
      console.log(a);
      console.log(m);
      setStationName(n ?? "Estación sin nombre");
      setAlerts(a ?? []);
      setMaintenance(m ?? []);
    }

    if (!isNaN(idStation)) load();
  }, [idStation]);

  return (
    <div className="p-6 space-y-10">
      {/* Encabezado */}
      <header className="flex justify-between items-center mb-6">
        <Title>🔔 Alertas & 🛠 Mantenimientos</Title>
        <Title>
          Estación <span className="text-sky-600">{stationName}</span>
        </Title>
         <Link
    href={`/dashboard/station/${idStation}`}
    className="px-4 py-2 rounded-lg bg-sky-600 text-white font-medium shadow hover:bg-sky-700 transition"
  >
    Volver a Estación
  </Link>
      </header>
       

      {/* ALERTAS */}
      <section className="space-y-3">
      
        <Subtitle>Alertas registradas</Subtitle>

        {alerts.length === 0 && (
          <Paragraph className="text-gray-500">
            No hay alertas registradas.
          </Paragraph>
        )}

        {alerts.length > 0 && (
          <div className="border rounded-xl overflow-hidden shadow-sm text-gray-600">
            <table className="min-w-full text-sm">
              <thead className="bg-sky-500 text-lg text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Nivel</th>
                  <th className="px-4 py-2 text-left">Variable</th>
                  <th className="px-4 py-2 text-left">Valor</th>
                  <th className="px-4 py-2 text-left">Rango permitido</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Sensor</th>
                </tr>
              </thead>

              <tbody>
  {alerts.map((a) => (
    <tr key={a.idalert} className="border-b ">
      <td className="px-4 py-2">{a.alert_type}</td>
      <td className="px-4 py-2">{a.level}</td>
      <td className="px-4 py-2">{a.variable_name}</td>

      <td
        className="px-4 py-2 font-semibold"
        style={{
          color:
            a.status_color === "HIGH"
              ? "#dc2626" // rojo
              : a.status_color === "LOW"
              ? "#2563eb" // azul
              : "#16a34a", // verde
        }}
      >
        {a.measurement_value}
      </td>

      <td className="px-4 py-2">
        {a.range_min} – {a.range_max}
      </td>

      <td className="px-4 py-2">
        {new Date(a.issued_date).toLocaleString()}
      </td>

      <td className="px-4 py-2">{a.sensor_id}</td>
    </tr>
  ))}
</tbody>

            </table>
          </div>
        )}
      </section>

      {/* MANTENIMIENTOS */}
      <section className="space-y-3">
        <Subtitle>Mantenimientos</Subtitle>

        {maintenance.length === 0 && (
          <Paragraph className="text-gray-500">
            No hay mantenimientos registrados.
          </Paragraph>
        )}

        {maintenance.length > 0 && (
          <div className="border rounded-xl overflow-hidden shadow-sm text-gray-600">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Tipo</th>
                  <th className="px-4 py-2 text-left">Descripción</th>
                  <th className="px-4 py-2 text-left">Documento</th>
                  <th className="px-4 py-2 text-left">Técnico</th>
                  <th className="px-4 py-2 text-left">Sensor</th>
                </tr>
              </thead>

              <tbody>
                {maintenance.map((m) => (
                  <tr key={m.idmaintenance} className="border-b">
                    <td className="px-4 py-2">
                      {new Date(m.maintenance_date).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-2">{m.type_maintenance}</td>
                    <td className="px-4 py-2">{m.description}</td>
                    <td className="px-4 py-2">
                      <a
                        href={m.certificated_documents_url}
                        className="text-sky-600 underline"
                        target="_blank"
                      >
                        Ver documento
                      </a>
                    </td>
                    <td className="px-4 py-2">{m.technician}</td>
                    <td className="px-4 py-2">{m.sensor_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
