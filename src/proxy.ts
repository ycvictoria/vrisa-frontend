import { NextResponse } from "next/server";

export function proxy() {
  // Middleware activo pero sin restricciones
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Solo aplica a /dashboard/*
};
