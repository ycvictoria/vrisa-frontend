import { NextResponse } from "next/server";

export function middleware() {
  // Middleware activo pero sin restricciones
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // Solo aplica a /dashboard/*
};