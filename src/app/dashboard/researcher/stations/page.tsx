"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { UsersTable } from "@/components/UsersTable";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import { Station } from "@/types/data_types";
import { StationCard } from "../../../../components/StationCard";

export default function MonitoreStations() {
  const [stations, setStations] = useState<Station[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // 🔍 Filtro combinado (búsqueda + estado)
  const filteredStations = stations.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.idStation.toString().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  // 🚀 Cargar estaciones mock
  useEffect(() => {
    async function loadStations() {
      try {
        const res = await fetch("/api/mock/stations");
        if (res.ok) {
          const data = await res.json();
          setStations(data);
        }
      } catch (error) {
        console.error("Error cargando estaciones:", error);
      }
    }

    loadStations();
  }, []);

  return (
    <div className="space-y-8">
      {/* 🧭 Header */}
      <header>
        <Title>👨🏻‍💻 Gestión de Estaciones</Title>
        <Paragraph>
          Para ver información sobre las estaciones monitoreadas.
        </Paragraph>
      </header>

      {/* ⚙️ Controles superiores */}
      <section className="space-y-4">
        <div className="flex justify-end gap-4">
          <Button variant="primary" size="md">
            Eliminar Estación
          </Button>
          <Button variant="primary" size="md">
            + Agregar Nueva Estación
          </Button>
        </div>

        <Subtitle>Mis estaciones monitoreadas</Subtitle>

        {/* 🔍 Buscador + Filtro */}
        <div className="flex gap-4 justify-between mb-5 mt-2">
          <SearchBar
            placeholder="Buscar por nombre o ID..."
            onSearch={setSearch}
          />

          <DropdownSelect
            value={filterStatus}
            onChange={setFilterStatus}
            options={[
              { value: "all", label: "Todos" },
              { value: "active", label: "Activos" },
              { value: "inactive", label: "Inactivos" },
            ]}
          />
        </div>

        {/* 📊 Tarjetas de estaciones */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredStations.map((s, i) => (
            <StationCard
              key={s.idStation ?? i} // ✅ Se agregó clave única
              name={s.name}
              location={s.ubication.address}
              status={s.status}
              lastUpdate={s.opening_date}
              sensors={0}
              alerts={2}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
