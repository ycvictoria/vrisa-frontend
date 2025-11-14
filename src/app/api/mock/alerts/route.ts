import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      idAlert: 1,
      alert_type: "high_CO2",
      level: "danger",
      description: "CO2 muy elevado",
      issued_date: "2023-10-25",
      idMeasurement: 1,
    },
  ]);
}

