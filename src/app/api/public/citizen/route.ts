import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

// ✅ Endpoint público: solo lectura para los ciudadanos
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("measurements_by_date") // 👈 usa tu tabla de datos ambientales
      .select(
        "station_name, latitude, longitude, variable_name, value, variable_unit, timestamp_measure"
      )
      .order("timestamp_measure", { ascending: false })
      .limit(50);

    if (error) {
      console.error("❌ Error Supabase:", error);
      return NextResponse.json({ error: "Error al obtener los datos públicos" }, { status: 500 });
    }

    // ✅ Agrupar los datos por estación para visualización
    const grouped = Object.values(
      (data ?? []).reduce((acc: any, item: any) => {
        if (!acc[item.station_name]) {
          acc[item.station_name] = {
            station_name: item.station_name,
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
  } catch (e: any) {
    console.error("❌ Error en /api/public/citizen:", e);
    return NextResponse.json(
      { error: "Error al obtener los datos públicos" },
      { status: 500 }
    );
  }
}
