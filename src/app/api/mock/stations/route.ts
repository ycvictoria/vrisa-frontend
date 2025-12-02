import { NextResponse } from "next/server";

let stations = [
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

export async function GET() {
  return NextResponse.json(stations);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newStation = {
    idStation: stations.length + 1,
    name: body.name,
    status: "active",
    opening_date: new Date().toISOString().slice(0, 10),
    closing_date: null,
    idTechnician: 1,
    ubication: {
      latitude: Number(body.latitude) || 0,
      longitude: Number(body.longitude) || 0,
      address: body.location ?? "Dirección no especificada",
    },
  };

  stations.push(newStation);

  return NextResponse.json(newStation, { status: 201 });
}
