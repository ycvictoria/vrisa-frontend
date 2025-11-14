import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    { station: 1, sensor: 1, timestamp: "2023-10-26T12:00:00", value: 48 },
  ]);
}

