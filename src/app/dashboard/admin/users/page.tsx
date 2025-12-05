"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { UsersTable } from "@/components/UsersTable";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import AddUserDialog from "@/components/AddUserDialog";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import { User } from "@/types/data_types";
import { getAllUsers } from "@/services/services";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
const [isDialogOpen, setIsDialogOpen] = useState(false);
const handleUserCreated = (newUser: User) => {
  setUsers((prev) => [...prev, newUser]);  // Agrega sin recargar
};
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.first_name.toLowerCase().includes(search.toLowerCase())  || 
      u.last_name.toLowerCase().includes(search.toLowerCase()) ||
    u.iduser.toString().includes(search.toLowerCase());

    const matchesStatus =
      filterStatus === "all" || u.account_status === filterStatus;
    return matchesSearch && matchesStatus;
  });

 async function loadUsers() {
    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);
  
  const stats = [
    { title: "Usuarios totales", value: users.length },
    {
      title: "Usuarios activos",
      value: users.filter((u) => u.account_status === "activo").length,
    },
    {
      title: "Autorizaciones pendientes",
      value: users.filter((u) => u.authorization_status === "pendiente").length,
    },
  ];

  return (
    <div className="space-y-8">
      <header>
        <Title>👨🏻‍💻 Gestión de Usuarios y Autorizaciones</Title>
        <Paragraph>
          Para manejar todos los usuarios registrados, asignar roles y autorizar accesos.
        </Paragraph>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <Subtitle>Todos los usuarios</Subtitle>
          <Button variant="primary" size="md" onClick={() => setIsDialogOpen(true)}>
            + Agregar Nuevo Usuario
          </Button>
        </div>

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
              { value: "activo", label: "Activos" },
              { value: "inactivo", label: "Inactivos" },
              { value: "suspendido", label: "Suspendidos" },
            ]}
          />
        </div>

        <UsersTable users={filteredUsers} />

         <AddUserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onUserCreated={handleUserCreated}
        
      />
      </section>
      
    </div>
  );
}
