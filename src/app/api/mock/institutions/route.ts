import { NextResponse } from "next/server";

export async function GET() {
  const institutions = [
    { idInstitution: 1, name: "Universidad del Valle", address: "Cali", idUser: 10 },
    { idInstitution: 2, name: "UTP Pereira", address: "Pereira", idUser: 11 },
  ];

  return NextResponse.json(institutions);
}
