import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      idVariable: 1,
      name: "CO2",
      category: "Gas",
      description: "Dióxido de Carbono",
      measurement_unit: "ppm",
      range_min: 0,
      range_max: 500,
    },
    {
      idVariable: 2,
      name: "PM2.5",
      category: "Partículas",
      description: "Material particulado fino",
      measurement_unit: "µg/m3",
      range_min: 0,
      range_max: 200,
    },
  ]);
}
