"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // 👈 Usa tu cliente real

export default function StationInfo() {
  const params = useParams();
  const idStation = Number(params.id);

  const [station, setStation] = useState<any>(null);
  const [ubication, setUbication] = useState<any>(null);
  const [sensors, setSensors] = useState<any[]>([]);
  const [variables, setVariables] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  // ============================================================
  //  1️⃣ CARGAR ESTACIÓN + UBICACIÓN + SENSORES + VARIABLES
  // ============================================================
  useEffect(() => {
    async function loadData() {
      try {
        // Obtener estación
        const { data: st, error: err1 } = await supabase
          .from("station")
          .select("*")
          .eq("idstation", idStation)
          .single();

        if (err1) throw err1;
        setStation(st);

        // Obtener ubicación
        const { data: ub, error: errUb } = await supabase
          .from("ubication")
          .select("*")
          .eq("idstation", idStation)
          .single();

        if (errUb) throw errUb;
        setUbication(ub);

        // Obtener sensores de la estación
        const { data: sns, error: err2 } = await supabase
          .from("sensor")
          .select("*")
          .eq("idstation", idStation);

        if (err2) throw err2;
        setSensors(sns);

        // Obtener variables desde measurement → variable
        const { data: vars, error: err3 } = await supabase
          .from("variable")
          .select(`
            idvariable,
            name,
            category,
            description,
            measurement_unit,
            measurement:measurement(idmeasurement)
          `);

        if (err3) throw err3;

        // Filtrar variables que realmente están en la estación
        const varsInStation = vars.filter(v =>
          v.measurement.some((m: any) =>
            sensors.map(s => s.idsensor).includes(m.idsensor)
          )
        );

        setVariables(varsInStation);

      } catch (error) {
        console.error("Error cargando estación:", error);
      }
    }

    loadData();
  }, [idStation]);

  // ============================================================
  //  2️⃣ FILTRO DE VARIABLES
  // ============================================================
  const filteredVariables = variables.filter(v =>
    v.name.toLowerCase().includes(search.toLowerCase()) ||
    v.description.toLowerCase().includes(search.toLowerCase())
  );

  // ============================================================
  //  3️⃣ BADGE DE ESTADO
  // ============================================================
  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-200 text-gray-600";
      case "maintenance":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  }

  return (
    <div className="space-y-8 ml-4 mt-4 text-gray-700">
      {/* ==========================================
          ENCABEZADO DE ESTACIÓN
      ============================================ */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">
          Estación {station?.name}
        </h1>

        {ubication && (
          <div className="text-gray-500">
            <p>{ubication.address}</p>
            <p>Lat: {ubication.latitude}</p>
            <p>Long: {ubication.longitude}</p>
          </div>
        )}

        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            station?.status
          )}`}
        >
          {station?.status ?? "desconocido"}
        </span>
      </header>

      {/* ==========================================
          BUSCADOR DE VARIABLES
      ============================================ */}
      <input
        type="text"
        placeholder="Buscar variable..."
        className="border px-3 py-2 rounded-md w-full max-w-md"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ==========================================
          SECCIÓN DE SENSORES
      ============================================ */}
      <section>
        <h2 className="text-xl font-semibold mb-3">Sensores Instalados</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sensors.map((s) => (
            <div key={s.idsensor} className="border rounded-xl p-4 shadow-sm">
              <p className="font-bold">{s.type}</p>
              <p className="text-gray-500">{s.brand} — {s.model}</p>
              <p className="text-sm">Estado: {s.status}</p>
              <p className="text-sm">Instalado: {s.installation_date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================
          VARIABLES ASOCIADAS
      ============================================ */}
      <section>
        <h2 className="text-xl font-semibold mt-6">Variables Medidas</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          {filteredVariables.map((v) => (
            <div key={v.idvariable} className="p-4 border rounded-xl shadow-sm">
              <h3 className="font-bold text-sky-700">{v.name}</h3>
              <p className="text-gray-600 text-sm">{v.description}</p>
              <p className="text-sm mt-1">
                Unidad: <strong>{v.measurement_unit}</strong>
              </p>
              <p className="text-xs text-gray-400">
                Categoría: {v.category}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
