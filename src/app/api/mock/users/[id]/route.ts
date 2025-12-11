import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/supabaseClient";

// GET: obtener usuario por ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const { data, error } = await supabase
      .from("user") // 
      .select("iduser, first_name, last_name, role, authorization_status, email, idlogin")
      .eq("iduser", id)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    const user = {
      idUser: data.iduser,
      first_name: data.first_name,
      last_name: data.last_name,
      role: data.role,
      status: data.authorization_status ?? "pendiente",
      email: data.email,
      idLogin: data.idlogin,
    };

    return NextResponse.json(user);
  } catch (e: any) {
    console.error("❌ Error en GET /api/mock/users/[id]:", e);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
