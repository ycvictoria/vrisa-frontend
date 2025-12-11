// src/app/api/public/stations/route.ts
import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient"; // ✅ usa el cliente ya configurado

export async function GET() {
  const { data, error } = await supabase
    .from("measurements_by_date")
    .select("station_name, latitude, longitude, variable_name, value, variable_unit, timestamp_measure")
    .order("timestamp_measure", { ascending: false })
    .limit(100);

  if (error) {
    console.error("❌ Error al cargar estaciones públicas:", error);
    return NextResponse.json(
      { error: "Error al cargar estaciones públicas" },
      { status: 500 }
    );
  }

  // ✅ Agrupar por estación
  const grouped = Object.values(
    data.reduce((acc: any, item: any) => {
      if (!acc[item.station_name]) {
        acc[item.station_name] = {
          name: item.station_name,
          latitude: item.latitude,
          longitude: item.longitude,
          variables: [],
        };
      }

      acc[item.station_name].variables.push({
        variable: item.variable_name,
        value: item.value,
        unit: item.variable_unit,
        timestamp: item.timestamp_measure,
      });

      return acc;
    }, {})
  );

  return NextResponse.json(grouped);
}
