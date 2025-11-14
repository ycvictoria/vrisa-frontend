"use client";
import { useState } from "react";
import { RoleBadge } from "@/components/RoleBadget";
import {  SmallText } from "@/components/Text";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";

export function UsersTable({ users }: any) {
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
            <th className="p-3">Status</th>
            <th className="p-3">Último Login</th>
            <th className="p-3">Acciones</th>
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
              <td className="p-3">{u.idUser}</td>
              <td className="p-3">{u.first_name +" "+ u.last_name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3"><RoleBadge role={u.role} /></td>
              <td className="p-3">{u.status}</td>
              <td className="p-3">{u.lastLogin}</td>
              <td className="p-3 space-x-2">
                 <Button variant="primary" size="sm">
                           Autorizar
                         </Button>
                         <Button variant="secondary" size="sm">
                           Rechazar
                         </Button>
              </td>
            </tr>
          ))
          )
        }
        </tbody>
      </table>

        
      <div className="p-3 border-t text-sm flex justify-between">
        
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
