"use client";

import { useEffect, useState } from "react";
import { Title, Subtitle, Paragraph } from "@/components/Text";
import SearchBar from "@/components/SearchBar";
import DropdownSelect from "@/components/DropdownSelect";
import Button from "@/components/Button";
import { StatsCard } from "@/components/StatsCard";
import Pagination from "@/components/Pagination";

/**
 * Pagina: Gestion de Investigadores 
 * Usa los mocks: /api/mock/institutions y /api/mock/researchers
 */

// tipos locales 
type Institution = {
  idInstitution: number;
  name: string;
  address?: string;
  logo?: string;
  color?: string;
};

type Researcher = {
  idUser: number;
  name: string;
  institution: number;
  state?: string; // active/inactive etc.
  date_issue?: string;
};

export default function InstitutionResearchersPage() {
  const [institution, setInstitution] = useState<Institution | null>(null);
  const [researchers, setResearchers] = useState<Researcher[]>([]);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // cargar institution 
  useEffect(() => {
    async function load() {
      try {
        const resInst = await fetch("/api/mock/institutions");
        if (resInst.ok) {
          const insts = await resInst.json();
          setInstitution(insts?.[0] ?? null);
        }

        const res = await fetch("/api/mock/researchers");
        if (res.ok) {
          const data = await res.json();
          // normalizamos algunos campos para la tabla
          const normalized: Researcher[] = data.map((r: any) => ({
            idUser: r.idUser,
            name: r.name,
            institution: r.institution,
            state: r.state ?? "active",
            date_issue: r.date_issue ?? "2023-01-01",
          }));
          setResearchers(normalized);
        }
      } catch (err) {
        console.error("Error cargando datos:", err);
      }
    }
    load();
  }, []);

  // filtro y busqueda
  const filtered = researchers.filter((r) => {
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.idUser.toString().includes(search);
    const matchesState = filterState === "all" || r.state === filterState;
    return matchesSearch && matchesState;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (currentPage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  // stats
  const stats = [
    { title: "Total Investigadores", value: researchers.length },
    { title: "Investigadores Activos", value: researchers.filter((r) => r.state === "active").length },
    { title: "Investigadores Inactivos", value: researchers.filter((r) => r.state !== "active").length },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <Title>Módulo de Gestión de Investigadores</Title>
        <Paragraph>Administrar investigadores asociados a su institución.</Paragraph>
      </header>

      {/* Informacion Institucion */}
      <section className="rounded-xl border p-6 bg-white shadow-sm">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold">Información de la Institución</h3>
            <p className="text-sm text-gray-600 mt-2">{institution?.name ?? "Institución no disponible"}</p>
            <p className="text-sm text-gray-500 mt-1">{institution?.address}</p>
          </div>

          <div className="flex items-center gap-6">
            {/* Logo */}
            <div className="w-20 h-20 rounded-md border flex items-center justify-center bg-gray-50">
              {institution?.logo ? (
                <img src={institution.logo} alt="logo" className="w-16 h-16 object-contain" />
              ) : (
                <div className="text-xs text-gray-500">Logo</div>
              )}
            </div>

            {/* Color corporativo */}
            <div className="text-sm text-gray-600">
              <div>Color Corporativo</div>
              <div
                style={{ width: 36, height: 36, borderRadius: 6, background: institution?.color ?? "#6b7280" }}
                className="mt-2 border"
              />
            </div>

            <div>
              <div className="text-sm text-gray-600">Total Investigadores</div>
              <div className="text-2xl font-semibold mt-1">{researchers.length}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {stats.map((s, i) => (
          <StatsCard key={i} title={s.title} value={s.value} />
        ))}
      </div>

      {/* Tabla + acciones */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <Subtitle>Gestión de Investigadores</Subtitle>
          <Button variant="primary" size="md">+ Agregar Investigador</Button>
        </div>

        <div className="flex gap-4 justify-between">
          <SearchBar placeholder="Buscar por nombre o ID..." onSearch={setSearch} />
          <DropdownSelect
            value={filterState}
            onChange={setFilterState}
            options={[
              { value: "all", label: "Todos" },
              { value: "active", label: "Activo" },
              { value: "inactive", label: "Inactivo" },
            ]}
          />
        </div>

        {/* Tabla */}
        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Rol</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Fecha de Adición</th>
                <th className="p-3">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">No hay investigadores para mostrar.</td>
                </tr>
              ) : (
                paginated.map((r) => (
                  <tr key={r.idUser} className="border-t text-gray-600">
                    <td className="p-3">{r.name}</td>
                    <td className="p-3">Investigador</td>
                    <td className="p-3">{r.state}</td>
                    <td className="p-3">{r.date_issue}</td>
                    <td className="p-3 space-x-2">
                      <Button variant="secondary" size="sm">Editar</Button>
                      <Button variant="danger" size="sm">Eliminar</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          <div className="p-3 border-t text-sm flex justify-between items-center">
            <div>Mostrando {researchers.length} investigadores.</div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(p) => setCurrentPage(p)} />
          </div>
        </div>
      </section>
    </div>
  );
}
