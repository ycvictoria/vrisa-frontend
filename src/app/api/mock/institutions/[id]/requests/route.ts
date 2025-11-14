import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      idAuthorization: 10,
      type_action: "request_access",
      idInstitution: 1,
      idStation: 1,
      state: "pending",
      date_issue: "2023-10-20",
    },
  ]);
}

