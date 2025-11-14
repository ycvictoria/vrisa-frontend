import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      idMaintenance: 1,
      maintenance_date: "2023-09-20",
      type_maintenance: "Preventivo",
      description: "Revisión general",
      certificated_documents_url: "http://example.com/doc.pdf",
      technician_in_charge: 3,
      idSensor: 1,
    },
  ]);
}

