"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { StationsTable } from "@/components/StationsTable";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import { Station } from "@/types/data_types";


export default function StationsAdminPage() {
  const [stations, setStations] = useState<Station[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

 
  //  Filtro combinado
 
  const filteredStations = stations.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.idStation.toString().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  
  //  Cargar estaciones mock
 
  useEffect(() => {
    async function loadUsers() {
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

    loadUsers();
  }, []);

  
  // Stats dinámicos
  const stats = [
    { title: "Estaciones totales", value: stations.length },
    {
      title: "Estaciones activas",
      value: stations.filter((u) => u.status === "active").length,
    },
    { title: "Activaciones mantenimiento",  
        value: stations.filter((u) => u.status === "maintenance").length,
     },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <Title>🖥️  Gestión de Estaciones </Title>
        <Paragraph>
          Para manejar todas las estaciones y su estado.
        </Paragraph>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      {/* Tabla */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <Subtitle>Todas las estaciones</Subtitle>
          <Button variant="primary" size="md">
            + Agregar Nueva Estación
          </Button>
          
        </div>

        {/* 🔍 Buscador + Filtro */}
        <div className="flex gap-4 justify-between">
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
              { value: "maintenance", label: "En mantenimiento" }
            ]}
          />
        </div>

        {/* Tabla filtrada */}
        <StationsTable stations={filteredStations} />
      </section>
    </div>
  );
}
