"use client";

import { useEffect, useState } from "react";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import { Station } from "@/types/data_types";
import { StationCard } from "../../../../components/StationCard";
import Button from "@/components/Button";


import SelectStationCard from "@/components/SelectStationCard";

import {
  getAllStations,
  getPendingRequests,
  getApprovedStations,
  requestJoinStation,
  
} from "@/services/stationNetwork";

const MOCK_USER_ID = 2;

export default function ResearcherStationsPage() {
  const userId = MOCK_USER_ID;

  const [stations, setStations] = useState<any[]>([]);
  const [pending, setPending] = useState<any[]>([]);
  const [approved, setApproved] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      setStations(await getAllStations());
      setPending(await getPendingRequests(userId));
      setApproved(await getApprovedStations(userId));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
// 🔍 Filtrar estaciones disponibles para unirse
const availableStations = stations.filter(st =>
  !pending.some(p => p.idstation === st.idstation) &&
  !approved.some(a => a.idstation === st.idstation)
);

  const isPending = (id: number) =>
    pending.some((p) => p.idstation === id);

  const isApproved = (id: number) =>
    approved.some((a) => a.idstation === id);

  return (
    <div className="space-y-10 p-4">
      <header>
        <Title>📡 Monitoreo de Estaciones</Title>
        <Paragraph>Solicita acceso o revisa tus estaciones autorizadas.</Paragraph>
      </header>

      {/* ====================== UNIRSE A UNA ESTACIÓN ====================== */}
      <section className="space-y-4">
        <Subtitle>Unirse a una estación</Subtitle>

        {loading && <Paragraph>Cargando estaciones...</Paragraph>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {availableStations.map((st) => {
            const pendingReq = isPending(st.idstation);
            const approvedReq = isApproved(st.idstation);

            return (
              <SelectStationCard
                key={st.idstation}
                name={st.name}
                location={st.ubication.address}
                status={st.status}
                lastUpdate={st.opening_date}
                sensors={0}
                alerts={0}
                canJoin={!pendingReq && !approvedReq}
                pending={pendingReq}
                approved={approvedReq}
                title={"Unirse"}
                onJoin={() => requestJoinStation(userId, st.idstation).then(loadData)}
                onView={() => (window.location.href = `/dashboard/station/${st.idstation}`)}
              />
            );
          })}
        </div>
      </section>

      {/* ====================== SOLICITUDES PENDIENTES ====================== */}
      <section className="space-y-3">
        <Subtitle>Solicitudes</Subtitle>

        {pending.length === 0 ? (
          <Paragraph className="text-gray-500">No tienes solicitudes pendientes.</Paragraph>
        ) : (
          <div className="border rounded-lg p-3 bg-white shadow-sm text-gray-500">
            <table className="min-w-full text-sm">
              <thead className="bg-blue-300">
                <tr>
                  <th className="px-3 py-2 text-left">Estación</th>
                  <th className="px-3 py-2 text-left">Fecha solicitud</th>
                  
                  <th className="px-3 py-2 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((p) => (
                  <tr key={p.idstation} className="border-b">
                    <td className="px-3 py-2">{p.name}</td>
                    <td className="px-3 py-2">{p.date_registration}</td>
                    <td className="px-3 py-2">{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* ====================== ESTACIONES APROBADAS ====================== */}
      <section className="space-y-4">
        <Subtitle>Estaciones aprobadas</Subtitle>

        {approved.length === 0 ? (
          <Paragraph className="text-gray-500">Aún no tienes estaciones autorizadas.</Paragraph>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {approved.map((st) => (
              <SelectStationCard
                key={st.idstation}
                name={st.name}
                location={st.address}
                status={st.status}
                lastUpdate={st.opening_date}
                sensors={0}
                alerts={0}
                canJoin={false}
                pending={false}
                approved={true}
                onJoin={() => {}}
                title={"Ver data"}
                stationId={st.idstation}
                onView={() => (window.location.href = `/dashboard/station/${st.idstation}`)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
