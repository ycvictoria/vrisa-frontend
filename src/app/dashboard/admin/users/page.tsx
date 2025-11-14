"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { UsersTable } from "@/components/UsersTable";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import { User } from "@/types/User";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

 
  //  Filtro combinado
 
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.first_name.toLowerCase().includes(search.toLowerCase()) ||
      u.idUser.toString().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || u.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  
  //  Cargar usuarios mock
 
  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch("/api/mock/users");
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Error cargando usuarios:", error);
      }
    }

    loadUsers();
  }, []);

  
  // Stats dinámicos
  const stats = [
    { title: "Usuarios totales", value: users.length },
    {
      title: "Usuarios activos",
      value: users.filter((u) => u.status === "active").length,
    },
    { title: "Autorizaciones pendientes", value: 1 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <Title>👨🏻‍💻 Gestión de Usuarios y Autorizaciones</Title>
        <Paragraph>
          Para manejar todos los usuarios registrados, asignar roles y autorizar accesos.
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
          <Subtitle>Todos los usuarios</Subtitle>
          <Button variant="primary" size="md">
            + Agregar Nuevo Usuario
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
            ]}
          />
        </div>

        {/* Tabla filtrada */}
        <UsersTable users={filteredUsers} />
      </section>
    </div>
  );
}
