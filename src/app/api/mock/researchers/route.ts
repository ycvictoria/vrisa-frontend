import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(url, key);

/* =========================================================
   ✅ GET: obtener investigadores/instituciones
========================================================= */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from("users_researcher_institution")
      .select("iduser, first_name, last_name, role, authorization_status, institution_name");

    if (error) throw error;

    const filtered = (data ?? []).filter(
      (u: any) => u.role === "researcher" || u.role === "institution"
    );

    const normalized = filtered.map((u: any) => ({
      id: u.iduser ?? 0,
      name:
        `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() ||
        u.institution_name ||
        "Nombre no registrado",
      role: u.role ?? "desconocido",
      status: u.authorization_status ?? "pendiente",
      created_at: new Date().toISOString().split("T")[0],
    }));

    return NextResponse.json(normalized);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   ✅ POST: crear nuevo investigador
========================================================= */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = `${(body.first_name ?? "user").toLowerCase()}.${(body.last_name ?? "new").toLowerCase()}@vrisa.com`;

    const { error } = await supabase.from("user").insert({
      first_name: body.first_name,
      last_name: body.last_name,
      role: body.role,
      email,
      authorization_status: "aprobado",
      registration_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;

    return NextResponse.json({ message: "Investigador creado correctamente" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

/* =========================================================
   ✅ PUT: actualizar investigador
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
      })
      .eq("iduser", body.id);

    if (error) throw error;

    return NextResponse.json({ message: "Investigador actualizado correctamente" });
  } catch (e: any) {
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

    if (!id) throw new Error("ID no proporcionado");

    const { error } = await supabase.from("user").delete().eq("iduser", id);

    if (error) throw error;

    return NextResponse.json({ message: "Investigador eliminado correctamente" });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
