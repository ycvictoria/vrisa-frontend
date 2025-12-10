import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

/* =========================================================
   ✅ GET: obtener todos los investigadores
========================================================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("all_users")
      .select("iduser, first_name, last_name, role, authorization_status, registration_date");

    if (error) {
      console.error("❌ Error en Supabase:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const filtered = (data ?? []).filter(
      (u) => u.role === "researcher" || u.role === "institution"
    );

    const normalized = filtered.map((u) => ({
      id: u.iduser,
      name: `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim(),
      role: u.role,
      status: u.authorization_status,
      created_at: u.registration_date,
    }));

    return NextResponse.json(normalized);
  } catch (e: any) {
    console.error("❌ Error general en GET /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   ✅ POST: crear nuevo investigador con email automático
========================================================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 🧠 Generar email autómatico
    const emailBase =
      (body.first_name?.toLowerCase() ?? "user") +
      "." +
      (body.last_name?.toLowerCase() ?? "new");
    const email = `${emailBase}@vrisa.com`;

    const { error } = await supabase.from("user").insert({
      first_name: body.first_name,
      last_name: body.last_name,
      role: body.role,
      email, // ✅ autogenerado
      authorization_status: "aprobado",
      registration_date: new Date().toISOString().split("T")[0],
    });

    if (error) {
      console.error("❌ Error en POST /api/mock/researchers:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Investigador creado correctamente" });
  } catch (e: any) {
    console.error("❌ Error general en POST /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   ✅ PUT: editar investigador
========================================================= */
export async function PUT(req: Request) {
  try {
    const body = await req.json();

    const { error } = await supabase
      .from("user")
      .update({
        first_name: body.first_name,
        last_name: body.last_name,
        role: body.role,
        authorization_status: body.authorization_status,
      })
      .eq("iduser", body.id);

    if (error) {
      console.error("❌ Error en PUT /api/mock/researchers:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Investigador actualizado correctamente" });
  } catch (e: any) {
    console.error("❌ Error general en PUT /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   ✅ DELETE: eliminar investigador
========================================================= */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id)
      return NextResponse.json({ error: "Falta el ID" }, { status: 400 });

    const { error } = await supabase.from("user").delete().eq("iduser", id);

    if (error) {
      console.error("❌ Error en DELETE /api/mock/researchers:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: "Investigador eliminado correctamente" });
  } catch (e: any) {
    console.error("❌ Error general en DELETE /api/mock/researchers:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
