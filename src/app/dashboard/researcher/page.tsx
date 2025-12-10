"use client";

import { useEffect, useMemo, useState } from "react";
import { getResearchers } from "@/services/researchers";
import type { Researcher } from "@/types/data_types";

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await getResearchers();

      // FILTRAR SOLO ROLES PERMITIDOS
      const filtered = data.filter(
        (u: Researcher) =>
          u.role === "researcher" || u.role === "institution"
      );

      setResearchers(filtered);
    };

    load();
  }, []);

  // 🔍 BUSCADOR SEGURO (EVITA toLowerCase EN undefined)
  const visible = useMemo(() => {
    const safeSearch = (search ?? "").toLowerCase();

    return researchers.filter((r) => {
      const safeName = (r?.name ?? "").toLowerCase();
      return safeName.includes(safeSearch);
    });
  }, [search, researchers]);

  // 📊 CONTADORES
  const total = researchers.length;
  const activos = researchers.filter((r) => r.status === "active").length;
  const inactivos = researchers.filter((r) => r.status !== "active").length;

  return (
    <div className="p-8 space-y-6">

      {/* ---------------- CONTADORES SUPERIORES ---------------- */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-blue-600 text-white">
          <p className="text-sm">Total de Investigadores / Instituciones</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>

        <div className="p-4 rounded-lg bg-green-600 text-white">
          <p className="text-sm">Activos</p>
          <p className="text-2xl font-bold">{activos}</p>
        </div>

        <div className="p-4 rounded-lg bg-red-600 text-white">
          <p className="text-sm">Inactivos</p>
          <p className="text-2xl font-bold">{inactivos}</p>
        </div>
      </div>

      {/* ---------------- BUSCADOR ---------------- */}
      <div>
        <input
          type="text"
          placeholder="Buscar investigador o institución..."
          className="w-full p-3 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* ---------------- TABLA ---------------- */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Rol</th>
              <th className="p-3">Estado</th>
              <th className="p-3">Fecha de Adición</th>
              <th className="p-3">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {visible.map((r: Researcher) => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r?.name ?? "Sin nombre"}</td>
                <td className="p-3 capitalize">{r.role}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">{r.created_at}</td>
                <td className="p-3">
                  <button className="text-blue-600 mr-3">Editar</button>
                  <button className="text-red-600">Eliminar</button>
                </td>
              </tr>
            ))}

            {visible.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  No se encontraron registros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
