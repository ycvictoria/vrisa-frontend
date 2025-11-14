
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    idUser: Number(params.id),
    first_name: "User" + params.id,
    last_name: "Test",
    role: "investigador",
    status: "active",
    email: `user${params.id}@vrisa.com`,
    idLogin: params.id,
  });
}