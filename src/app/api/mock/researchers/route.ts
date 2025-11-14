import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { idUser: 2, name: "Bob Williams", institution: 1 },
    { idUser: 8, name: "Laura Méndez", institution: 2 },
  ]);
}

