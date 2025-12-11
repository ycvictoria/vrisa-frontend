"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Title, Subtitle, Paragraph, SmallText } from "@/components/Text";

import LineChart from "@/components/LineChart";

import {
  getVariablesGroupedByStation,
  getAllStations,
  getStationReport,
} from "@/services/stations";

interface Estacion {
  idstation: number;
  name: string;
}

interface Registro {
  estacion: string;
  fecha: string;
  parametro: string;
  valor: number;
  unidad: string;
}

export default function Informes() {
  const [stations, setStations] = useState<Estacion[]>([]);
  const [selectedStations, setSelectedStations] = useState<number[]>([]);
  const [variablesPorEstacion, setVariablesPorEstacion] = useState<any[]>([]);
  const [selectedParams, setSelectedParams] = useState<number[]>([]);

  // Fechas iniciales
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setDate(today.getDate() - 400);

  const [sinceDate, setSinceDate] = useState(lastMonth.toISOString().slice(0, 10));
  const [intoDate, setIntoDate] = useState(today.toISOString().slice(0, 10));
  const [sinceHour, setSinceHour] = useState("00:00");
  const [intoHour, setIntoHour] = useState("23:59");

  const [registros, setRegistros] = useState<Registro[]>([]);

  // -------------------------------------------------------------
  // Cargar estaciones
  // -------------------------------------------------------------
  useEffect(() => {
    async function loadStations() {
      const data = await getAllStations();
      setStations(data);
    }
    loadStations();
  }, []);

  // -------------------------------------------------------------
  // Seleccionar estación
  // -------------------------------------------------------------
  const toggleStation = (id: number) => {
    setSelectedStations((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------
  // Cargar variables de estaciones seleccionadas
  // -------------------------------------------------------------
  useEffect(() => {
    async function loadVars() {
      if (selectedStations.length === 0) {
        setVariablesPorEstacion([]);
        setSelectedParams([]);
        return;
      }

      const data = await getVariablesGroupedByStation(selectedStations);
      setVariablesPorEstacion(data);
    }

    loadVars();
  }, [selectedStations]);

  // -------------------------------------------------------------
  // Seleccionar variables
  // -------------------------------------------------------------
  const toggleParam = (id: number) => {
    setSelectedParams((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // -------------------------------------------------------------
  // GENERAR REPORTE
  // -------------------------------------------------------------
  const generarReporte = async () => {
    const data = await getStationReport({
      stations: selectedStations,
      variables: selectedParams,
      since: `${sinceDate} ${sinceHour}`,
      until: `${intoDate} ${intoHour}`,
    });

    setRegistros(data);
  };

  // -------------------------------------------------------------
  // EXPORTAR CSV
  // -------------------------------------------------------------
  const exportarCSV = () => {
    if (registros.length === 0) return alert("No hay datos para exportar.");

    const header = ["Estación", "Fecha", "Parámetro", "Valor", "Unidad"];
    const rows = registros.map((r) => [
      r.estacion,
      r.fecha,
      r.parametro,
      r.valor,
      r.unidad,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [header, ...rows].map((e) => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.href = encodedUri;
    link.download = "reporte_estaciones.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  // -------------------------------------------------------------
  // AGRUPAR DATOS PARA LOS GRÁFICOS POR VARIABLE
  // -------------------------------------------------------------
  const graficosPorVariable: Record<string, any> = {};

  registros.forEach((r) => {
    const variable = r.parametro;

    if (!graficosPorVariable[variable]) {
      graficosPorVariable[variable] = {
        labels: [],
        series: {},
      };
    }

    if (!graficosPorVariable[variable].series[r.estacion]) {
      graficosPorVariable[variable].series[r.estacion] = [];
    }

    graficosPorVariable[variable].labels.push(r.fecha);
    graficosPorVariable[variable].series[r.estacion].push(r.valor);
  });

  const colores = [
    "#2563eb", "#16a34a", "#dc2626", "#7c3aed",
    "#ea580c", "#0891b2", "#db2777", "#65a30d"
  ];

  return (
    <div className="p-8 space-y-10 text-gray-600">
      <Title>Generación de Informes Analíticos Para Institución</Title>

      <div className="grid grid-cols-2 gap-8">
        {/* -----------------------------------------------------
           PANEL IZQUIERDO: Estaciones + Fechas
        ------------------------------------------------------ */}
        <div className="border p-4 rounded space-y-4">
          <Subtitle className="text-sky-600">Configuración del Informe</Subtitle>

          {/* Selección de estaciones */}
          <Paragraph className="text-sky-500">Seleccionar Estaciones</Paragraph>
          <div className="space-y-1 mt-1">
            {stations.map((est) => (
              <label key={est.idstation} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedStations.includes(est.idstation)}
                  onChange={() => toggleStation(est.idstation)}
                />
                {est.name}
              </label>
            ))}
          </div>

          {/* Fechas */}
          <div className="flex gap-4 mt-3">
            <div>
              <label>Desde:</label>
              <input
                type="date"
                value={sinceDate}
                onChange={(e) => setSinceDate(e.target.value)}
                className="border rounded p-1"
              />
            </div>

            <div>
              <label>Hasta:</label>
              <input
                type="date"
                value={intoDate}
                onChange={(e) => setIntoDate(e.target.value)}
                className="border rounded p-1"
              />
            </div>
          </div>

          {/* Horas */}
          <div className="flex gap-4 mt-2">
            <div>
              <label>Hora Inicio:</label>
              <input
                type="time"
                value={sinceHour}
                onChange={(e) => setSinceHour(e.target.value)}
                className="border rounded p-1"
              />
            </div>

            <div>
              <label>Hora Fin:</label>
              <input
                type="time"
                value={intoHour}
                onChange={(e) => setIntoHour(e.target.value)}
                className="border rounded p-1"
              />
            </div>
          </div>
        </div>

        {/* -----------------------------------------------------
           PANEL DERECHO: Variables por estación
        ------------------------------------------------------ */}
        <div className="border p-4 rounded space-y-4">
          <Subtitle className="text-sky-600">Variables por Estación</Subtitle>

          {variablesPorEstacion.length === 0 && (
            <Paragraph>Seleccione estaciones para ver sus variables.</Paragraph>
          )}

          {variablesPorEstacion.map((est) => (
            <div key={est.idStation} className="border p-3 rounded bg-gray-50">
              <h3 className="text-lg font-semibold text-sky-700">{est.station}</h3>

              {(est.variables ?? []).map((v: any) => (
                <label
                  key={v.idVariable}
                  className="flex items-center gap-2 ml-4 mt-1"
                >
                  <input
                    type="checkbox"
                    checked={selectedParams.includes(v.idVariable)}
                    onChange={() => toggleParam(v.idVariable)}
                  />
                  {v.name} ({v.unit})
                </label>
              ))}
            </div>
          ))}

          <Button
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 mt-4"
            onClick={generarReporte}
          >
            Generar Reporte
          </Button>
        </div>
      </div>

      {/* -----------------------------------------------------
         TABLA DE RESULTADOS
      ------------------------------------------------------ */}
      <div className="border p-4 rounded">
        <Subtitle className="text-sky-600">Vista Previa del Informe</Subtitle>

        <div className="max-h-[400px] overflow-y-auto border rounded mt-3">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Estación</th>
                <th className="border px-2 py-1">Fecha</th>
                <th className="border px-2 py-1">Parámetro</th>
                <th className="border px-2 py-1">Valor</th>
                <th className="border px-2 py-1">Unidad</th>
              </tr>
            </thead>

            <tbody>
              {registros.map((r, idx) => (
                <tr key={idx}>
                  <td className="border px-2 py-1">{r.estacion}</td>
                  <td className="border px-2 py-1">{r.fecha}</td>
                  <td className="border px-2 py-1">{r.parametro}</td>
                  <td className="border px-2 py-1">{r.valor}</td>
                  <td className="border px-2 py-1">{r.unidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-3 border-t text-sm text-gray-500">
          <SmallText>
            Mostrando {registros.length} mediciones.
          </SmallText>
        </div>
      </div>

      {/* -----------------------------------------------------
         BOTONES DE ACCIÓN
      ------------------------------------------------------ */}
      <div className="mt-4 flex gap-4 justify-center">
        <Button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          onClick={exportarCSV}
        >
          Exportar CSV
        </Button>
      </div>

      {/* -----------------------------------------------------
         GRAFIOS POR VARIABLE
      ------------------------------------------------------ */}
      <div className="space-y-10 mt-10">
        {Object.keys(graficosPorVariable).map((variable, idx) => {
          const info = graficosPorVariable[variable];
          const estaciones = Object.keys(info.series);

          const datasets = estaciones.map((est, estIdx) => ({
            label: `${est} — ${variable}`,
            data: info.series[est],
            borderColor: colores[estIdx % colores.length],
            backgroundColor: colores[estIdx % colores.length],
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 3,
          }));

          return (
            <LineChart
              key={idx}
              canvasId={`grafico-var-${idx}`}
              labels={info.labels}
              datasets={datasets}
              title={`Variable: ${variable}`}
            />
          );
        })}
      </div>
    </div>
  );
}
