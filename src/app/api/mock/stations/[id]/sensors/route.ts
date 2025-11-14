
import { NextResponse } from "next/server";

export async function GET() {
  const sensors = [
    {
      idSensor: 1,
      brand: "Acme",
      model: "X100",
      type: "CO2",
      status: "active",
      installation_date: "2022-03-10",
      idStation: 1,
    },
    {
      idSensor: 2,
      brand: "Acme",
      model: "Y200",
      type: "PM2.5",
      status: "active",
      installation_date: "2022-04-12",
      idStation: 1,
    },
  ];

  return NextResponse.json(sensors);
}
