import { NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient"; // ✅ Usa el cliente ya configurado

export async function POST(req: Request) {
  try {
    const { description } = await req.json();

    if (!description) {
      return NextResponse.json(
        { error: "El campo descripción es obligatorio" },
        { status: 400 }
      );
    }

    // Inserta el reporte ciudadano en la tabla "citizen_reports"
    const { error } = await supabase
      .from("citizen_reports")
      .insert([
        {
          description,
          status: "pendiente",
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error("❌ Error al guardar reporte ciudadano:", error);
      return NextResponse.json(
        { error: "Error al guardar el reporte" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Reporte guardado correctamente ✅",
    });
  } catch (error) {
    console.error("❌ Error inesperado en el endpoint:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
