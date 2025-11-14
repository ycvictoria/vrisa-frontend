"use client";

import { RoleBadge } from "@/components/RoleBadget";


export function UsersTable({ users }: any) {
  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-3">Nombre</th>
            <th className="p-3">Email</th>
            <th className="p-3">Rol</th>
            <th className="p-3">Status</th>
            <th className="p-3">Último Login</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u: any, i: number) => (
            <tr key={i} className="border-t text-gray-600 ">
              <td className="p-3">{u.first_name +" "+ u.last_name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3"><RoleBadge role={u.role} /></td>
              <td className="p-3">{u.status}</td>
              <td className="p-3">{u.lastLogin}</td>
              <td className="p-3 space-x-2">
                <button className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm">Autorizar</button>
                <button className="px-3 py-1 rounded-md bg-gray-200 text-gray-700 text-sm">Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="p-3 border-t text-sm text-gray-600">
        Mostrando {users.length} usuarios.
      </div>
    </div>
  );
}
