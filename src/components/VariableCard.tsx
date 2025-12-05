/*import { Paragraph, Subtitle } from "./Text";
interface VariableProps{
    name: string,
      category: string,
      description: string,
      measurement_unit: string,
      range_min: number,
      range_max: number
      
}
export function VariableCard({  
      name,
      category, 
      description,
      measurement_unit,
      range_min,
      range_max}: VariableProps
      ) {
  return (
    <div className="rounded-xl border  p-6 shadow-md">
      <div className="flex-col justify-between">
        <Subtitle className="text-sky-400">{name}</Subtitle>
       
        <Paragraph>Unidad: {measurement_unit}</Paragraph>
        <Paragraph>Unidad: {range_min}- {range_max}</Paragraph>
      </div>
    </div>
  );
}
*/

"use client";

import {
  Thermometer,
  Droplets,
  Wind,
  CloudSun,
  Gauge,
  Leaf,
  Radiation,
  Cloud,
  Activity,
  HelpCircle
} from "lucide-react";
import { SmallText, Subtitle } from "./Text";

interface VariableCardProps {
  name: string;
  category: string;
  description: string;
  measurement_unit: string;
  range_min: number;
  range_max: number;
  value?: number;
}

export function VariableCard({
  name,
  category,
  description,
  measurement_unit,
  range_min,
  range_max,
  value,
}: VariableCardProps) {

  // Íconos por variable
  const iconsByVariable: Record<string, any> = {
    "Temperatura": Thermometer,
    "Humedad": Droplets,
    "Velocidad del Viento": Wind,
    "Radiación Solar": CloudSun,
    "CO2": Cloud,
    "PM2.5": Activity,
    "PM10": Activity,
    "NO2": Leaf,
    "SO2": Gauge,
    "O3": Radiation,
  };

  const Icon = iconsByVariable[name] ?? HelpCircle;

  // ---------------------------
  // 📌 CÁLCULO DE NIVEL / BADGE
  // ---------------------------
  function getLevel() {
    if (value === undefined) {
      return { label: "Sin datos", color: "bg-gray-400 text-white" };
    }

    const percent = (value - range_min) / (range_max - range_min);

    if (percent <= 0.33)
      return { label: "Leve", color: "bg-green-400 text-white" };

    if (percent <= 0.66)
      return { label: "Moderado", color: "bg-yellow-400 text-white" };

    if (percent <= 0.9)
      return { label: "Alto", color: "bg-orange-400 text-white" };

    return { label: "Muy Alto", color: "bg-red-400 text-white" };
  }

  const level = getLevel();

  return (
    <div className="relative p-5 rounded-xl shadow-sm border bg-white flex flex-col gap-3 hover:shadow-md transition">

      {/* Badge de nivel */}
      {category !== "Meteorológica" && (
      <span
        className={`absolute top-6 right-5 px-3 py-1 text-xs font-semibold rounded-full ${level.color}`}
      >
        {level.label}
      </span>
      )}
      {/* Header con icono */}
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-blue-50">
          <Icon className="w-6 h-6 text-blue-700" />
        </div>

        <div>
          <Subtitle  className="text-sky-600">{name}</Subtitle>
          

      {/* Descripción */}

      <SmallText className="text-gray-200">{description}</SmallText>
      
        </div>
      </div>

      {/* Valor actual */}
      <div className="mt-2 flex flex-col justify-center items-center">
        {value !== undefined ? (
          <p className="text-3xl font-bold text-gray-500">
            {value}
            <span className="text-lg text-gray-500 ml-1">{measurement_unit}</span>
          </p> 
        ) : (
          <p className="text-gray-500 text-sm">Sin datos actuales</p>
        )}
      {/* Rango */}
      <p className="text-xs text-gray-400 mt-2">
        Rango: {range_min} – {range_max} {measurement_unit}
      </p>
      
      </div>


    </div>
  );
}
