import { NextResponse } from "next/server";

export async function GET() {
  const stations = [
    {
      idStation: 1,
      name: "Estación Norte",
      status: "active",
      opening_date: "2020-01-01",
      closing_date: null,
      idTechnician: 1,
      ubication: {
        latitude: 3.4516,
        longitude: -76.5320,
        address: "Cali, Colombia",
      },
    },
    {
      idStation: 2,
      name: "Estación Sur",
      status: "maintenance",
      opening_date: "2021-05-15",
      closing_date: null,
      idTechnician: 2,
      ubication: {
        latitude: 3.402,
        longitude: -76.550,
        address: "Cali Sur, Colombia",
      },
    },
  ];

  return NextResponse.json(stations);
}
