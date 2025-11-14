import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    idUser: 1,
    first_name: "Alice",
    last_name: "Johnson",
    role: "admin",
    status: "active",
    idLogin: 1,
  });
}