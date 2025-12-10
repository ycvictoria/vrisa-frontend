"use client";

import { useState } from "react";
import Button from "./Button";
import { createUser } from "@/services/services";
import { Subtitle_Blue } from "./Text";

export default function AddUserDialog({ isOpen, onClose, onUserCreated }: any) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("citizen");

  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const newUserPayload = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim().toLowerCase(),
        role: role,
      };

      const result = await createUser(newUserPayload);

      // 👇👇 AQUI SE ENVIA EL NUEVO USUARIO A LA PAGINA
      //if (onUserCreated) onUserCreated(result[0]);

       if (onUserCreated && result && result[0]) {
  onUserCreated(result[0]);
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Error al crear usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <Subtitle_Blue className="mb-3">Agregar Nuevo Usuario</Subtitle_Blue>

        <div className="space-y-3 text-gray-500">
          <input
            className="w-full border p-2 rounded"
            placeholder="Nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            className="w-full border p-2 rounded"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="email"
            className="w-full border p-2 rounded"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <select
            className="w-full border p-2 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="researcher">Investigador</option>
            <option value="institution">Instituto</option>
            <option value="citizen">Ciudadano</option>
            <option value="technician">Técnico</option>
            <option value="admin">Administrador</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>

          <Button variant="primary" onClick={handleSubmit}>
            {loading ? "Guardando..." : "Guardar"}
          </Button>
        </div>
      </div>
    </div>
  );
}

