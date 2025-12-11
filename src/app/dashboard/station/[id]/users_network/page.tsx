"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Title, Subtitle, Paragraph } from "@/components/Text";
import Button from "@/components/Button";

import { getStationNetworkUsers, toggleUserStatus } from "@/services/stationNetwork";
import {getEstacionNombre} from "@/services/stations"

interface StationUser {
  iduser: number;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  last_status_change:string;
  date_registration: string;
}

export default function StationUserNetworkPage() {
  const { id } = useParams();
  const stationId = Number(id);

  const [users, setUsers] = useState<StationUser[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [nameStation, setNameStation] = useState("");

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await getStationNetworkUsers(stationId);
      const id= stationId;
      const name= await getEstacionNombre(id);
      setNameStation(name);
      setUsers(data);
      
    } catch (err) {
      console.error("Error cargando usuarios:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!Number.isNaN(stationId)) loadUsers();
  }, [stationId]);

  async function handleToggleStatus(userId: number) {
    try {
      await toggleUserStatus(stationId, userId);
      loadUsers(); // refrescar
    } catch (err) {
      console.error("Error cambiando estado:", err);
    }
  }

  return (
    <div className="space-y-8 mt-4 ml-4 text-gray-700">
      <header>
        <Title>👥 Usuarios conectados a la estación  {nameStation}</Title>
        <Paragraph>
          Aquí puedes administrar las solicitudes y accesos de los usuarios asociados.
        </Paragraph>
      </header>

      <section className="space-y-3">
        <Subtitle className="text-sky-600 ">Red de Usuarios</Subtitle>

        {loading && <Paragraph>Cargando usuarios...</Paragraph>}

        {!loading && users.length === 0 && (
          <Paragraph className="text-gray-500">
            No hay usuarios asociados a esta estación.
          </Paragraph>
        )}

        {!loading && users.length > 0 && (
          <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
            <table className="min-w-full text-md">
              <thead className="bg-gray-100 text-gray-600">
                <tr>
                  
                  <th className="px-4 py-2 text-left">Id</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Estado</th>
                  <th className="px-4 py-2 text-left">Fecha Registro</th>
                  
                  <th className="px-4 py-2 text-left">Fecha Último Cambio</th>
                  <th className="px-4 py-2 text-left">Acción</th>
                </tr>
              </thead>

              <tbody>
                {users.map((u) => (
                  <tr key={u.iduser} className="border-b last:border-b-0">
                     <td className="px-4 py-2 font-medium">
                      {u.iduser} 
                    </td>
                    <td className="px-4 py-2 font-medium">
                      {u.first_name} {u.last_name}
                    </td>

                    <td className="px-4 py-2">{u.email}</td>

                    <td className="px-4 py-2 ">
                      <span
                        className={`px-2 py-1 rounded-full text-md ${
                          u.status === "activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.status}
                      </span>
                    </td>
                    

                    <td className="px-4 py-2 text-gray-500">
                      {new Date(u.date_registration).toLocaleDateString()}
                    </td>
                    

                    <td className="px-4 py-2 text-gray-500">
                      {new Date(u.last_status_change).toLocaleDateString()}
                    </td>
                    
                    
                    <td className="px-4 py-2">
                      <button
                        onClick={() => handleToggleStatus(u.iduser)}
                        className={`px-3 py-1 rounded text-md font-medium transition ${
                          u.status === "activo"
                            ? "bg-red-400 text-white hover:bg-red-600"
                            : "bg-green-400 text-white hover:bg-green-600"
                        }`}
                      >
                        {u.status === "activo" ? "Desactivar" : "Activar"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
