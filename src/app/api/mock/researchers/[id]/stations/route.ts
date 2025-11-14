import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { idStation: 1, date_affiliation: "2023-02-01", status: "granted" },
  ]);
}
