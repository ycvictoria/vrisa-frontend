import { NextResponse } from "next/server";

export async function GET() {
  const users = [
    {
      idUser: 1,
      first_name: "Alice",
      last_name: "Johnson",
      role: "admin",
      registration_date: "2023-01-10",
      status: "active",
      email: "alice@vrisa.com",
      idLogin: 1,
      last_access: "2023-10-26",
    },
    {
      idUser: 2,
      first_name: "Bob",
      last_name: "Williams",
      role: "investigador",
      registration_date: "2023-02-14",
      status: "active",
      email: "bob@vrisa.com",
      idLogin: 2,
      last_access: "2023-10-25",
    },
    {
      idUser: 3,
      first_name: "Charlie",
      last_name: "Brown",
      role: "institution",
      registration_date: "2023-03-01",
      status: "pending",
      email: "charlie@vrisa.com",
      idLogin: 3,
      last_access: null,
    },
    {
      idUser: 4,
      first_name: "Diana",
      last_name: "Prince",
      role: "ciudadano",
      registration_date: "2023-05-11",
      status: "active",
      email: "diana@vrisa.com",
      idLogin: 4,
      last_access: "2023-10-24",
    },
  ];

  return NextResponse.json(users);
}
