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
import { getAllUsers , authorizeUser,rejectUser,activateUser,deactivateUser} from "@/services/services";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
const [isDialogOpen, setIsDialogOpen] = useState(false);
const handleUserCreated = (newUser: User) => {
  setUsers((prev) => [...prev, newUser]);  // Agrega sin recargar
};

const safeUsers = Array.isArray(users)
  ? users.filter((u) => u && typeof u === "object")
  : [];
const filteredUsers = (safeUsers ?? []).filter((u) => {
  if (!u) return false; // evita undefined

  const firstName = u.first_name ?? "";
  const lastName  = u.last_name ?? "";
  const id        = String(u.iduser ?? "");

  const matchesSearch =
    firstName.toLowerCase().includes(search.toLowerCase()) ||
    lastName.toLowerCase().includes(search.toLowerCase()) ||
    id.includes(search.toLowerCase());

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

  async function handleUserUpdate(action: string, id: number) {
  try {
    switch (action) {
      case "authorize":
        await authorizeUser(id);
        break;
      case "reject":
        await rejectUser(id);
        break;
      case "activate":
        await activateUser(id);
        break;
      case "deactivate":
        await deactivateUser(id);
        break;
    }

    // refrescar usuarios después de actualizar
    loadUsers();
  } catch (err) {
    console.error("Error actualizando usuario:", err);
  }
}

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
            ]}
          />
        </div>

        <UsersTable users={filteredUsers}  onUpdate={handleUserUpdate} />

         <AddUserDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        
        onUserCreated={handleUserCreated}
       
      />
      </section>
      
    </div>
  );
}
