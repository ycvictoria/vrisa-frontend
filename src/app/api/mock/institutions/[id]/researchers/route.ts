import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { idUser: 2, name: "Bob Williams", state: "active", date_issue: "2023-01-10" },
  ]);
}

