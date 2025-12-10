"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Title, Subtitle, Paragraph } from "@/components/Text";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import { StatsCard } from "@/components/StatsCard";

import {
  getUsersByStation,
  approveUser,
  rejectUser,
  activateUser,
  deactivateUser
} from "@/services/stationNetwork";

export default function StationNetworkPage() {

  const params = useParams();
  const idStation = Number(params.id);   // 👈 obtiene el ID desde la URL

  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // ===============================
  // Cargar usuarios de la red
  // ===============================
  async function loadUsers() {
    try {
      const data = await getUsersByStation(idStation);
      setUsers(data);
    } catch (err) {
      console.error("Error cargando usuarios de la red:", err);
    }
  }

  useEffect(() => {
    if (!Number.isNaN(idStation)) loadUsers();
  }, [idStation]);

  // ===============================
  // Acciones sobre usuarios
  // ===============================
  async function handleUserAction(action: string, userId: number) {
    try {
      if (action === "approve") await approveUser(idStation, userId);
      if (action === "reject") await rejectUser(idStation, userId);
      if (action === "activate") await activateUser(idStation, userId);
      if (action === "deactivate") await deactivateUser(idStation, userId);

      loadUsers(); // refrescar
    } catch (err) {
      console.error("Error ejecutando acción:", err);
    }
  }

  // ===============================
  // Filtro visual
  // ===============================
  const filtered = users.filter((u) => {
    const full = `${u.first_name} ${u.last_name}`.toLowerCase();
    const matchesSearch = full.includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || u.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { title: "Usuarios conectados", value: users.length },
    { title: "Aprobados", value: users.filter((u) => u.status === "aprobado").length },
    { title: "Pendientes", value: users.filter((u) => u.status === "pendiente").length },
  ];

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <header>
        <Title>🌐 Gestión de Usuarios en la Red de la Estación</Title>
        <Paragraph>
          Aquí puedes aprobar o rechazar solicitudes de acceso para esta estación.
        </Paragraph>
      </header>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      {/* FILTROS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <SearchBar placeholder="Buscar usuario..." onSearch={setSearch} />

          <DropdownSelect
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: "all", label: "Todos" },
              { value: "pendiente", label: "Pendientes" },
              { value: "aprobado", label: "Aprobados" },
              { value: "rechazado", label: "Rechazados" },
              { value: "inactivo", label: "Inactivos" },
            ]}
          />
        </div>

        {/* TABLA */}
        <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2 text-left">Usuario</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-center">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((u) => (
                <tr key={u.iduser} className="border-b last:border-b-0">
                  <td className="px-4 py-2">{u.first_name} {u.last_name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 capitalize">{u.status}</td>

                  <td className="px-4 py-2 flex gap-2 justify-center">
                    
                    {/* Pendiente → aprobar / rechazar */}
                    {u.status === "pendiente" && (
                      <>
                        <Button size="sm" variant="primary" onClick={() => handleUserAction("approve", u.iduser)}>
                          Aprobar
                        </Button>
                        <Button size="sm" variant="danger" onClick={() => handleUserAction("reject", u.iduser)}>
                          Rechazar
                        </Button>
                      </>
                    )}

                    {/* Aprobado → desactivar */}
                    {u.status === "aprobado" && (
                      <Button size="sm" variant="secondary" onClick={() => handleUserAction("deactivate", u.iduser)}>
                        Desactivar
                      </Button>
                    )}

                    {/* Inactivo → activar */}
                    {u.status === "inactivo" && (
                      <Button size="sm" variant="primary" onClick={() => handleUserAction("activate", u.iduser)}>
                        Activar
                      </Button>
                    )}

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>
    </div>
  );
}

