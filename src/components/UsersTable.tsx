"use client";
import { useState } from "react";
import { RoleBadge } from "@/components/RoleBadget";
import {  SmallText } from "@/components/Text";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";

export function UsersTable({ users , onUpdate}: any) {
  const pageSize = 10;
  const totalPages = Math.ceil(users.length / pageSize);

  const [currentPage, setCurrentPage] = useState(1);

  const start = (currentPage - 1) * pageSize;
  const paginatedUsers = users.slice(start, start + pageSize);


  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-3">Id</th>
            <th className="p-3">Nombre</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Status Autorización</th>
            <th className="p-3">Acceso</th>
            <th className="p-3">Día registro</th>
            <th className="p-3">Autorización Pendiente</th>
             <th className="p-3">Activar/Inactivar</th>
          </tr>
        </thead>

        <tbody>
          {paginatedUsers.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No hay usuarios para mostrar.
              </td>
            </tr>
          ) : (
          paginatedUsers.map((u: any, i: number) => (
            
            <tr key={i} className="border-t text-gray-600 ">

              <td className="p-3">{u.iduser}</td>
              <td className="p-3">{u.first_name +" "+ u.last_name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3"><RoleBadge role={u.role} /></td>
              <td className="p-3">{u.authorization_status}</td>
              <td className="p-3">{u.account_status}</td>
              <td className="p-3">{u.registration_date}</td>
              <td className="flex gap-2">

  {/* SI ESTÁ PENDIENTE → MOSTRAR AUTORIZACIÓN Y RECHAZO */}
  {u.authorization_status === "pendiente" && (
    <>
      <Button
        variant="primary"
        size="md"
        onClick={() => onUpdate("authorize", u.iduser)}
      >
        Autorizar
      </Button>

      <Button
        variant="secondary"
        size="md"
        onClick={() => onUpdate("reject", u.iduser)}
      >
        Rechazar
      </Button>
    </>
  )}

  
</td>
<td>
{/* BOTONES SIEMPRE VISIBLES — pero deshabilitados si NO está aprobado */}
  {u.account_status === "activo" ? (
    <Button
      variant="secondary"
      size="md"
      className="bg-blue-200"
      disabled={u.authorization_status !== "aprobado"}
      onClick={() => onUpdate("deactivate", u.iduser)}
    >
      Inactivar
    </Button>
  ) : (
    <Button
      variant="primary"
      size="md"
      disabled={u.authorization_status !== "aprobado"}
      onClick={() => onUpdate("activate", u.iduser)}
    >
      Activar
    </Button>
  )}

</td>
            </tr>
          ))
          )
        }
        </tbody>
      </table>

        
      <div className="p-3 border-t text-sm flex justify-between text-gray-500">
        
        <SmallText> Mostrando {users.length} usuarios. </SmallText>
         <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      </div>
    </div>
  );
}
