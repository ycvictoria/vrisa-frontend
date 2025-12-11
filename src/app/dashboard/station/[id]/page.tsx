"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";


import {
  MapPin,
  Thermometer,
  Wind,
  CloudRain,
  Gauge,
  Sun,
  Droplet,
  Cloud,
} from "lucide-react";

import { Title, Subtitle, Paragraph, SmallText } from "@/components/Text";
import Button from "@/components/Button";
import LineChart from "@/components/LineChart";

// Servicios
import {
  getStationById,
  getStationUbication,
  getSensorsByStation,
  getVariablesByStation,
  getStationVariableHistory,
  getLastMeasurementsByStation,
} from "@/services/stations";

type DateRangeOption = "today" | "month" | "year" | "all";

interface Station {
  idstation: number;
  name: string;
  status: string;
}

interface Ubication {
  idstation: number;
  latitude: number;
  longitude: number;
  address: string;
}

interface Sensor {
  idsensor: number;
  brand: string;
  model: string;
  type: string;
  status: string;
  installation_date: string;
}

interface Variable {
  idvariable: number;
  name: string;
  category: string;
  description: string;
  measurement_unit: string;
}

interface HistoryPoint {
  timestamp_measure: string;
  value: number;
}

interface LastVariable {
  idvariable: number;
  variable_name: string;
  unit: string;
  category: string;
  last_value: number | null;
  last_timestamp: string | null;
}

// =======================
// ICONOS INTELIGENTES
// =======================
function getCategoryIcon(category?: string, name?: string) {
  const t = `${category} ${name}`.toLowerCase();

  if (t.includes("temperatura")) return <Thermometer size={32} className="text-orange-500" />;
  if (t.includes("humedad")) return <Droplet size={32} className="text-blue-400" />;
  if (t.includes("viento")) return <Wind size={32} className="text-indigo-500" />;
  if (t.includes("lluvia") || t.includes("precip")) return <CloudRain size={32} className="text-blue-600" />;

  if (t.includes("pm") || t.includes("o3") || t.includes("no2") || t.includes("co"))
    return <Gauge size={32} className="text-red-500" />;

  if (t.includes("radiacion") || t.includes("solar"))
    return <Sun size={32} className="text-yellow-500" />;

  return <Cloud size={32} className="text-gray-400" />;
}

export default function StationPage() {
  const params = useParams();
  const idStation = Number(params.id);

  const [station, setStation] = useState<Station | null>(null);
  const [ubication, setUbication] = useState<Ubication | null>(null);
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [variables, setVariables] = useState<Variable[]>([]);
  const [lastVariables, setLastVariables] = useState<LastVariable[]>([]);

  const [search, setSearch] = useState("");
  const [selectedVariableId, setSelectedVariableId] = useState<number | null>(null);
  const [dateRange, setDateRange] = useState<DateRangeOption>("today");
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  // ================================
  // 1️⃣ CARGA DE DATOS PRINCIPALES
  // ================================
  useEffect(() => {
    async function loadAll() {
      const st = await getStationById(idStation);
      setStation(st);

      const ub = await getStationUbication(idStation);
      setUbication(ub);

      const sns = await getSensorsByStation(idStation);
      setSensors(sns);

      const vars = await getVariablesByStation(idStation);
      setVariables(vars);

      if (vars.length > 0) setSelectedVariableId(vars[0].idvariable);

      // Últimas mediciones
      const last = await getLastMeasurementsByStation(idStation);
      setLastVariables(last);
    }

    if (!isNaN(idStation)) loadAll();
  }, [idStation]);

  // ================================
  // 2️⃣ FILTRO DE VARIABLES
  // ================================
  const filteredVariables = useMemo(
    () =>
      variables.filter(
        (v) =>
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.description.toLowerCase().includes(search.toLowerCase())
      ),
    [variables, search]
  );

  // ================================
  // 3️⃣ CALCULAR RANGO FECHAS
  // ================================
  function getDateRange(option: DateRangeOption) {
    const now = new Date();
    let since = new Date();

    switch (option) {
      case "today":
        since.setHours(0, 0, 0, 0);
        break;
      case "month":
        since.setMonth(since.getMonth() - 1);
        break;
      case "year":
        since.setFullYear(since.getFullYear() - 1);
        break;
      default:
        since = new Date("2000-01-01");
    }

    return { since: since.toISOString(), until: now.toISOString() };
  }

  // ================================
  // 4️⃣ HISTORIAL PARA GRÁFICA
  // ================================
  useEffect(() => {
    async function loadHistory() {
      if (!selectedVariableId) return;

      setLoadingHistory(true);

      const { since, until } = getDateRange(dateRange);
      const data = await getStationVariableHistory(idStation, selectedVariableId, since, until);

      setHistory(data);
      setLoadingHistory(false);
    }

    if (idStation && selectedVariableId) loadHistory();
  }, [idStation, selectedVariableId, dateRange]);

  const selectedVariable = variables.find((v) => v.idvariable === selectedVariableId);

  const chartLabels = history.map((p) =>
    new Date(p.timestamp_measure).toLocaleString()
  );

  const chartDataset = [
    {
      label: selectedVariable?.name ?? "Variable",
      data: history.map((p) => p.value),
      borderColor: "#2563eb",
      backgroundColor: "#2563eb",
      tension: 0.3,
    },
  ];

  // ================================
  // ⭐ UI COMPLETO
  // ================================
  return (
    <div className="space-y-10 p-6 text-gray-700">

      {/* ⭐ ENCABEZADO */}
      <header className="space-y-2">
        <Title>Estación {station?.name}</Title>

        {ubication && (
          <>
            <p className="flex items-center gap-2 text-gray-500">
              <MapPin size={18} /> {ubication.address}
            </p>

            <div className="flex gap-6">
              <Paragraph>Lat: {ubication.latitude}</Paragraph>
              <Paragraph>Long: {ubication.longitude}</Paragraph>
            </div>
          </>
        )}
<div className=" flex justify-end">
  <Link
    href={`/dashboard/station/${idStation}/alerts_and_maintenance`}
    className="px-3 py-2 rounded-md bg-sky-500 hover:bg-sky-600 text-white font-medium shadow-md transition"
  >
    🔧 Ver Alertas & Mantenimiento
  </Link>
</div>
        <span
          className={`px-3 py-1 rounded-full text-lg font-medium ${station?.status === "active"
            ? "bg-green-100 text-green-700"
            : station?.status === "maintenance"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600"
            }`}
        >
          {station?.status}
        </span>
      </header>

      {/* ⭐ SENSORES */}
      <section>
        <Subtitle>Sensores instalados</Subtitle>

        <div className="border rounded-xl overflow-hidden shadow-sm mt-2">
          <table className="text-sm w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Marca</th>
                <th className="px-4 py-2 text-left">Modelo</th>
                <th className="px-4 py-2 text-left">Tipo</th>
                <th className="px-4 py-2 text-left">Estado</th>
                <th className="px-4 py-2 text-left">Instalación</th>
              </tr>
            </thead>

            <tbody>
              {sensors.map((s) => (
                <tr key={s.idsensor} className="border-b">
                  <td className="px-4 py-2">{s.brand}</td>
                  <td className="px-4 py-2">{s.model}</td>
                  <td className="px-4 py-2">{s.type}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${s.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    {new Date(s.installation_date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ⭐ VARIABLES + ÚLTIMA MEDICIÓN */}
      <section>
        <Subtitle>Variables y última medición</Subtitle>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
          {lastVariables.map((v) => {
  const isSelected = selectedVariableId === v.idvariable;

  return (
    <div
      key={v.idvariable}
      onClick={() => setSelectedVariableId(v.idvariable)}
      className={`
        p-4 border rounded-xl shadow-sm cursor-pointer transition
        ${isSelected ? "border-sky-500 shadow-md bg-sky-50" : "bg-white hover:shadow-lg"}
      `}
    >
      <div className="flex justify-between items-start">
        <div className="p-2 bg-sky-50 rounded-full">
          {getCategoryIcon(v.category, v.variable_name)}
        </div>

        <SmallText className="text-gray-400">
          {v.last_timestamp
            ? new Date(v.last_timestamp).toLocaleString()
            : "Sin datos"}
        </SmallText>
      </div>

      <h3 className="mt-3 font-semibold text-lg">
        {v.variable_name}{" "}
        <span className="text-sm text-gray-500">({v.unit})</span>
      </h3>

      <p className="text-3xl font-bold mt-2 text-sky-700">
        {v.last_value ?? "—"}
      </p>

      <SmallText className="text-gray-500 mt-1">
        Última medición registrada
      </SmallText>
    </div>
  );
})}

        </div>
      </section>

      {/* ⭐ GRÁFICA */}
      <section>
        <Subtitle>Gráfica de la variable</Subtitle>

        <div className="flex items-center flex-wrap gap-2 mb-4">
          <Button
            size="md"
            variant={dateRange === "today" ? "primary" : "secondary"}
            onClick={() => setDateRange("today")}
          >
            Hoy
          </Button>
          <Button
            size="md"
            variant={dateRange === "month" ? "primary" : "secondary"}
            onClick={() => setDateRange("month")}
          >
            Mes
          </Button>
          <Button
            size="md"
            variant={dateRange === "year" ? "primary" : "secondary"}
            onClick={() => setDateRange("year")}
          >
            Año
          </Button>
          <Button
            size="md"
            variant={dateRange === "all" ? "primary" : "secondary"}
            onClick={() => setDateRange("all")}
          >
            Desde el Inicio
          </Button>
        </div>

        {loadingHistory ? (
          <Paragraph>Cargando datos...</Paragraph>
        ) : history.length === 0 ? (
          <Paragraph>No hay datos para esta variable.</Paragraph>
        ) : (
          <LineChart
            canvasId="station-variable-chart"
            labels={chartLabels}
            datasets={chartDataset}
            title={`Historial de ${selectedVariable?.name}`}
          />
        )}

        <SmallText>Puntos: {history.length}</SmallText>
      </section>
    </div>
  );
}