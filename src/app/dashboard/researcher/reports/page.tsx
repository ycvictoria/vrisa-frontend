
"use client";
import Button from "@/components/Button";
import { Paragraph, Subtitle, Title } from "@/components/Text";
import { useState } from "react";

interface Estacion {
  id: number;
  name: string;
}

interface Parametro {
  id: string;
  name: string;
}

interface Registro {
  estacion: string;
  fecha: string;
  parametro: string;
  valor: number;
  unidad: string;
}

const estaciones: Estacion[] = [
  { id: 1, name: "Estación Central A" },
  { id: 2, name: "Estación Urbana B" },
  { id: 3, name: "Estación Industrial C" },
  { id: 4, name: "Estación Rural D" },
  { id: 5, name: "Estación Costera E" },
  { id: 6, name: "Estación Forestal F" },
];

const parametrosContaminants: Parametro[] = [
  { id: "pm25", name: "PM2.5" },
  { id: "pm10", name: "PM10" },
  { id: "co", name: "Monóxido de Carbono (CO)" },
  { id: "so2", name: "Sulfur Dioxide (SO2)" },
  { id: "o3", name: "Ozono (O3)" },
  { id: "no2", name: "Nitrogen Dioxide (NO2)" }
];
const meteorologicParams: Parametro[] = [
  { id: "aqi", name: "Air Quality Index (AQI)" },
  { id: "temperatura", name: "Temperatura" },
  { id: "humedad", name: "Humedad" },
  { id: "presion", name: "Presión atmosférica" },
  { id: "direccionViento", name: "Dirección viento" },
  { id: "velViento", name: "Velocidad Viento" }
];
const selectTime: Parametro[] = [
  { id: "hoy", name: "Hoy" },
  { id: "semana", name: "Esta semana" },
  { id: "mes", name: "Este mes" }
];
export default function Informes() {
  const [selectedEstaciones, setSelectedEstaciones] = useState<number[]>([]);
  const [selectedParamsContaminants, setSelectedParamsContaminants] = useState<string[]>(["pm25"]);

  const [selectedParamsMeteo, setSelectedParamsMeteo] = useState<string[]>([ "temperatura"]);

  const [sinceDate, setSinceDate] = useState("2023-01-01");
  const [intoDate, setIntoDate] = useState("2023-01-31");

  const [selectedDate, setSelectedDate] =useState<string[]>(["Hoy"]);
  const [sinceHour, setSinceHour] = useState("00:00:00");
   const [intoHour, setToHour] = useState("24:00:00");

  const [registros, setRegistros] = useState<Registro[]>([
    { estacion: "Estación Central A", fecha: "2023-01-05", parametro: "PM2.5", valor: 15.2, unidad: "µg/m³" },
    { estacion: "Estación Central A", fecha: "2023-01-05", parametro: "Temperatura", valor: 22.1, unidad: "°C" },
    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "PM2.5", valor: 35.8, unidad: "µg/m³" },
    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "Ozono (O3)", valor: 65.3, unidad: "µg/m³" },
    { estacion: "Estación Urbana B", fecha: "2023-01-15", parametro: "Temperatura", valor: 18.7, unidad: "°C" },

    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "PM2.5", valor: 35.8, unidad: "µg/m³" },
    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "Ozono (O3)", valor: 65.3, unidad: "µg/m³" },
    { estacion: "Estación Urbana B", fecha: "2023-01-15", parametro: "Temperatura", valor: 18.7, unidad: "°C" },

    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "PM2.5", valor: 35.8, unidad: "µg/m³" },
    { estacion: "Estación Industrial C", fecha: "2023-01-10", parametro: "Ozono (O3)", valor: 65.3, unidad: "µg/m³" },
    { estacion: "Estación Urbana B", fecha: "2023-01-15", parametro: "Temperatura", valor: 18.7, unidad: "°C" },
  ]);

  const toggleEstacion = (id: number) => {
    setSelectedEstaciones((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleParametroContaminants = (id: string) => {
    setSelectedParamsContaminants((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
   const toggleParametroMeteoro = (id: string) => {
    setSelectedParamsMeteo((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
  
  const toggleParamsDate = (id: string) => {
    setSelectedDate((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const generarReporte = () => {
    // Aquí iría la lógica real para filtrar y obtener los datos del backend
    console.log("Generando reporte para:", selectedEstaciones, selectedParamsMeteo, selectedParamsContaminants, intoDate);
  };

  const exportarCSV = () => {
    // Función de ejemplo
    alert("Exportar CSV (implementación real depende del backend o librería)");
  };

  const exportarPDF = () => {
    alert("Exportar PDF (implementación real depende de jsPDF o backend)");
  };

  return (
    <div className="p-8 space-y-6">
        <Title>Generación de Informes Analíticos</Title>

      {/* Configuración del Informe */}
      <div className="grid grid-cols-2 gap-8 text-gray-500">
        <div className="border p-4 rounded space-y-4 ">
            <Subtitle className="text-sky-600">Configuración del Informe</Subtitle>
          <div>

            <Paragraph  className="text-sky-500">Selección de Estaciones</Paragraph>
            <div className="space-y-1 mt-1 ">
              {estaciones.map((est) => (
                <label key={est.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedEstaciones.includes(est.id)}
                    onChange={() => toggleEstacion(est.id)}
                  />
                  {est.name}
                </label>
              ))}
            </div>
          </div>

           <div>
              <Paragraph className="text-sky-500">Selección de Periodos</Paragraph>
            <div className="space-y-1 mt-1 flex flex-row gap-5">
              {selectTime.map((date) => (
                <label  className="flex  items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedDate.includes(date.id)}
                    onChange={() => toggleParamsDate(date.id)}
                  />
                  {date.name}
                </label>
              ))}
            </div>
            </div>
          <div className="flex gap-4">
            <div>
              <label className="block font-medium">Desde</label>
              <input
                type="date"
                value={sinceDate}
                onChange={(e) => setSinceDate(e.target.value)}
                className="border rounded p-1"
              />
            </div>
          
            <div>
              <label className="block font-medium">Hasta</label>
              <input
                type="date"
                value={intoDate}
                onChange={(e) => setIntoDate(e.target.value)}
                className="border rounded p-1"
              />
            </div>
         
          </div>
            <div className="flex gap-4">
                   <div>
      <label  className="block font-medium">Hora Inicio:</label>
      <input
        type="time"
        id="hora-input"
        name="hora-input"
        value={sinceHour}
        onChange={(e) => setSinceHour(e.target.value)}
        min="00:00"
        max="24:00"
        step="30"
         className="border rounded p-1"
      />
    </div>
               <div>
      <label  className="block font-medium">Hora Fin:</label>
      <input
        type="time"
        id="hora-input"
        name="hora-input"
        value={intoHour}
        onChange={(e) => setToHour(e.target.value)}
        min="00:00"
        max="24:00"
        step="30"
         className="border rounded p-1"
      />
    </div>
            </div>

        </div>

        {/* Ajustar Parámetros */}
        <div className="border p-4 rounded space-y-4">
          <h2 className="font-semibold">Ajustar Parámetros</h2>
          <div>
            <label className="block font-medium">Tipo de Informe</label>
            <select className="border rounded p-1 w-full mt-1">
              <option>Reporte en tabla </option>
               <option>Grafica de datos</option>
            </select>
          </div>
          <div className="mt-2">
            <div className="grid grid-cols-2 gap-2 mt-1">
                  <div className="grid grid-cols-1 gap-2 mt-1"> 
              <Paragraph className="block text-sky-500 font-medium">  Meteorológicos</Paragraph>
            
                     {meteorologicParams.map((param) => (
                <label key={param.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedParamsMeteo.includes(param.id)}
                    onChange={() => toggleParametroMeteoro(param.id)}
                  />
                  {param.name}
                </label>
              ))} </div>
              
                <div className="grid grid-cols-1 gap-2 mt-1">  
              <Paragraph className="block text-sky-500 font-medium">Contaminantes</Paragraph>
              {parametrosContaminants.map((param) => (
                <label key={param.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedParamsContaminants.includes(param.id)}
                    onChange={() => toggleParametroContaminants(param.id)}
                  />
                  {param.name}
                </label>
              ))} </div>
            </div>
          </div>
        
             <Button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={generarReporte} >
           
            Generar Reporte</Button>
        </div>
      </div>

      {/* Vista previa del informe */}
      <div className="border p-4 rounded">

              <Subtitle className="block text-sky-500 font-medium">Vista Previa del Informe</Subtitle>
       
        <div className="overflow-x-auto text-gray-500">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1 text-left">Estación</th>
                <th className="border px-2 py-1 text-left">Fecha</th>
                <th className="border px-2 py-1 text-left">Parámetro</th>
                <th className="border px-2 py-1 text-left">Valor</th>
                <th className="border px-2 py-1 text-left">Unidad</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r, i) => (
                <tr key={i}>
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

        {/* Botones de exportación */}
        <div className="mt-4 flex justify-center gap-2">
        
           <Button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={exportarCSV} >
            Exportar CSV</Button>
           <Button className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300" onClick={exportarPDF} >
            Exportar PDF</Button>
         
        </div>
      </div>
    </div>
  );
}
