"use client";

import { Title, Subtitle, Paragraph } from "@/components/Text";
import Button from "@/components/Button";

export default function Login() {
  return (
    <div>
        <Title>
            Módulo de Login </Title>
            <Button variant = "primary" size = "md">Aceptar</Button>
      <h2 className="text-xl font-semibold mb-4">Módulo de L</h2>
      <ul className="space-y-3">
        <li className="p-4 bg-white rounded-xl border shadow-sm">
          <a href="dashboard/admin/users">Administrar usuarios</a>
        </li>
        <li className="p-4 bg-white rounded-xl border shadow-sm">
          <a href="dashboard/admin/stations">Administrar estaciones</a>
        </li>
      </ul>
    </div>
  );
}