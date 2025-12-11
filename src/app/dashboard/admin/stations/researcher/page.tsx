"use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import SearchBar from "@/components/SearchBar";

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [editing, setEditing] = useState<any | null>(null);
  const [newResearcher, setNewResearcher] = useState({
    first_name: "",
    last_name: "",
    role: "researcher",
  });

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ✅ Cargar investigadores desde la API
  async function loadResearchers() {
    const res = await fetch("/api/mock/researchers");
    const data = await res.json();

    // ✅ El backend ya devuelve name completo
    const normalized = (Array.isArray(data) ? data : []).map((u: any) => ({
      id: u.id ?? u.iduser ?? 0,
      name: u.name ?? "Sin nombre",
      role: u.role ?? "",
      status: u.status ?? "pendiente",
      created_at: u.created_at ?? "",
    }));

    console.log("✅ Normalizados en frontend:", normalized);

    setResearchers(normalized);
    setFiltered(normalized);
  }

  useEffect(() => {
    loadResearchers();
  }, []);

  // ✅ Guardar o actualizar investigador
  async function handleSave() {
    const method = editing ? "PUT" : "POST";
    const body = editing
      ? { ...editing, ...newResearcher }
      : { ...newResearcher };

    const res = await fetch("/api/mock/researchers", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) throw new Error("Error al guardar investigador");

    await loadResearchers();
    setOpenModal(false);
    setEditing(null);
    setNewResearcher({ first_name: "", last_name: "", role: "researcher" });
  }

  // ✅ Eliminar investigador
  async function handleDelete(id: number) {
    if (!confirm("¿Seguro que deseas eliminar este investigador?")) return;

    const res = await fetch(`/api/mock/researchers?id=${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Error al eliminar investigador");

    await loadResearchers();
  }

  // ✅ Editar investigador
  function handleEdit(user: any) {
    setEditing(user);
    const [first, last] = (user.name ?? "").split(" ");
    setNewResearcher({
      first_name: first || "",
      last_name: last || "",
      role: user.role,
    });
    setOpenModal(true);
  }

  // ✅ Buscar por nombre o rol
  function handleSearch(query: string) {
    const lower = query.toLowerCase();
    const filteredList = researchers.filter(
      (r) =>
        (r.name ?? "").toLowerCase().includes(lower) ||
        (r.role ?? "").toLowerCase().includes(lower)
    );
    setFiltered(filteredList);
    setCurrentPage(1);
  }

  // ✅ Paginación
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filtered.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // ✅ Contadores
  const total = researchers.length;
  const activos = researchers.filter((r) => r.status === "aprobado").length;
  const inactivos = total - activos;

  return (
    <div className="p-8 space-y-8">
      {/* Contadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <p className="text-gray-500 font-medium">Total Investigadores</p>
          <p className="text-3xl font-bold text-gray-700">{total}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <p className="text-gray-500 font-medium">Activos</p>
          <p className="text-3xl font-bold text-green-600">{activos}</p>
        </div>
        <div className="bg-white shadow-md rounded-xl p-5 text-center">
          <p className="text-gray-500 font-medium">Inactivos</p>
          <p className="text-3xl font-bold text-red-500">{inactivos}</p>
        </div>
      </div>

      {/* Barra de búsqueda y botón */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <SearchBar
          placeholder="Buscar por nombre o rol..."
          onSearch={handleSearch}
        />
        <button
          onClick={() => {
            setEditing(null);
            setOpenModal(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow transition"
        >
          + Agregar Investigador
        </button>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-3 px-4 text-left">Nombre</th>
              <th className="py-3 px-4 text-left">Rol</th>
              <th className="py-3 px-4 text-left">Estado</th>
              <th className="py-3 px-4 text-left">Fecha de Adición</th>
              <th className="py-3 px-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-500 italic">
                  No hay investigadores para mostrar.
                </td>
              </tr>
            ) : (
              paginated.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50 transition">
                  <td className="py-3 px-4 font-medium text-gray-800">
                    {r.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 capitalize">
                    {r.role}
                  </td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      r.status === "aprobado"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {r.status}
                  </td>
                  <td className="py-3 px-4 text-gray-500">
                    {r.created_at || "—"}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => handleEdit(r)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              {editing ? "Editar Investigador" : "Agregar Investigador"}
            </h3>

            <input
              type="text"
              placeholder="Nombre"
              value={newResearcher.first_name}
              onChange={(e) =>
                setNewResearcher({ ...newResearcher, first_name: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={newResearcher.last_name}
              onChange={(e) =>
                setNewResearcher({ ...newResearcher, last_name: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            <select
              value={newResearcher.role}
              onChange={(e) =>
                setNewResearcher({ ...newResearcher, role: e.target.value })
              }
              className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="researcher">Researcher</option>
              <option value="institution">Institution</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpenModal(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
              >
                {editing ? "Guardar Cambios" : "Agregar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

