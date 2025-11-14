"use client";

import { useEffect, useState } from "react";
import { StatsCard } from "@/components/StatsCard";
import { UsersTable } from "@/components/UsersTable";

import { User } from "@/types/User";

export default function UsuariosAdminPage() {
const [users, setUsers] = useState<User[]>([]);

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

  // Estos stats pueden calcularse dinámicamente si quieres
  const stats = [
    { title: "Usuarios totales", value: users.length },
    { title: "Usuarios activos", value: users.filter(u => u.status === "active").length },
    { title: "Autorizaciones pendientes", value: 1 },
  ];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Gestión de Usuarios y Autorizaciones</h1>
        <p className="text-gray-600">
          Para manejar todos los usuarios registrados, asignar roles y autorizar accesos.
        </p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      {/* Tabla */}
      <section className="space-y-4">
        <div className="flex justify-between">
          <p className="font-medium text-lg text-gray-800">Todos los usuarios</p>

          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-sm">
            + Agregar Nuevo Usuario
          </button>
        </div>

        {/* Aquí ya se usa el mock real */}
        <UsersTable users={users} />
      </section>
    </div>
  );
}
