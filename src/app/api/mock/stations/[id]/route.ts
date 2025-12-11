import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient"; // ✅ Cliente ya configurado

// ✅ GET: obtener una estación específica por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("stations") // 👈 tu tabla real en Supabase
      .select("idstation, name, status, opening_date, idtechnician, latitude, longitude, address")
      .eq("idstation", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Estación no encontrada" }, { status: 404 });
    }

    // ✅ Estructura limpia para el frontend
    const station = {
      idStation: data.idstation,
      name: data.name,
      status: data.status,
      opening_date: data.opening_date,
      idTechnician: data.idtechnician,
      ubication: {
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
      },
    };

    return NextResponse.json(station);
  } catch (e: any) {
    console.error("❌ Error en GET /api/mock/stations/[id]:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}

