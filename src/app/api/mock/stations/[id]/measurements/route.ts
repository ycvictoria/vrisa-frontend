import { NextResponse } from "next/server";

export async function GET() {
  const measurements = [
    {
      idMeasurement: 1,
      value: 45.2,
      timestamp_date: "2023-10-26T12:00:00",
      idSensor: 1,
      idParameter: 1,
    },
    {
      idMeasurement: 2,
      value: 52.8,
      timestamp_date: "2023-10-26T13:00:00",
      idSensor: 1,
      idParameter: 1,
    },
  ];

  return NextResponse.json(measurements);
}
