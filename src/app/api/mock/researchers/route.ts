import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

/* =========================================================
   GET: Obtener investigadores e instituciones
========================================================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("user")
      .select(
        "iduser, first_name, last_name, role, authorization_status, account_status, registration_date"
      );

    if (error) throw error;

    const filtered = (data ?? []).filter(
      (u: any) => u.role === "researcher" || u.role === "institution"
    );

    const normalized = filtered.map((u: any) => ({
      id: u.iduser ?? 0,
      name:
        `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() ||
        "Nombre no registrado",
      role: u.role ?? "desconocido",
      status: u.authorization_status ?? "pendiente",
      created_at:
        u.registration_date ?? new Date().toISOString().split("T")[0],
    }));

    console.log("✅ Datos enviados al frontend:", normalized);
    return NextResponse.json(normalized);
  } catch (e: any) {
    console.error("❌ Error en GET /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   POST: Crear nuevo investigador
========================================================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const emailBase =
      (body.first_name?.toLowerCase() ?? "user") +
      "." +
      (body.last_name?.toLowerCase() ?? "new");
    const email = `${emailBase}@vrisa.com`;

    const { error } = await supabase.from("user").insert({
      first_name: body.first_name,
      last_name: body.last_name,
      role: body.role ?? "researcher",
      email,
      authorization_status: "aprobado",
      account_status: "activo", // 🟢 Enum compatible
      registration_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;

    return NextResponse.json({
      message: "Investigador creado correctamente",
    });
  } catch (e: any) {
    console.error("❌ Error en POST /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   PUT: Actualizar investigador
========================================================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Falta el ID del investigador" },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from("user")
      .update({
        first_name: body.first_name,
        last_name: body.last_name,
        role: body.role,
        authorization_status: body.status,
        account_status: body.account_status ?? "activo",
      })
      .eq("iduser", body.id);

    if (error) throw error;

    return NextResponse.json({
      message: "Investigador actualizado correctamente",
    });
  } catch (e: any) {
    console.error("❌ Error en PUT /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
    DELETE: Eliminar investigador 
========================================================= */
export async function DELETE(req: Request) {
  try {
    // Intentamos leer el ID del body
    let id: number | null = null;

    try {
      const body = await req.json();
      id = body?.id ?? null;
    } catch {
      // Si no hay body, tomamos el id desde la URL
      const url = new URL(req.url);
      const paramId = url.searchParams.get("id");
      id = paramId ? Number(paramId) : null;
    }

    if (!id) {
      return NextResponse.json(
        { error: "Falta el ID del investigador" },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("user").delete().eq("iduser", id);

    if (error) throw error;

    return NextResponse.json({
      message: `Investigador con id ${id} eliminado correctamente`,
    });
  } catch (e: any) {
    console.error("❌ Error en DELETE /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
