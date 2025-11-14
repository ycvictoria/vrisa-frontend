import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({
    idStation: Number(params.id),
    name: "Estación " + params.id,
    status: "active",
    opening_date: "2020-01-01",
    idTechnician: 1,
    ubication: {
      latitude: 3.45 + Math.random(),
      longitude: -76.53 - Math.random(),
      address: "Dirección generada",
    },
  });
}
