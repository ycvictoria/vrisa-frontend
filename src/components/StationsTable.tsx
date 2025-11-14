"use client";
import { useState, useEffect } from "react";
import { SmallText } from "@/components/Text";
import Pagination from "@/components/Pagination";
import Button from "@/components/Button";
import { Station } from "@/types/data_types";

type Props = {
  stations?: Station[];
};

export function StationsTable({ stations = [] }: Props) {
  const pageSize = 10;
  const totalPages = Math.ceil(stations.length / pageSize) || 1;

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1); 
  }, [stations]);

  const start = (currentPage - 1) * pageSize;
  const paginatedStations = stations.slice(start, start + pageSize);

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-600 text-sm">
          <tr>
            <th className="p-3">Id</th>
            <th className="p-3">Nombre de Estación</th>
            <th className="p-3">Ubicación</th>
            <th className="p-3">Estado</th>
            <th className="p-3">Fecha de Apertura</th>
            <th className="p-3">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {paginatedStations.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-6 text-center text-gray-500">
                No hay estaciones para mostrar.
              </td>
            </tr>
          ) : (
            paginatedStations.map((u: Station) => (
              <tr key={u.idStation} className="border-t text-gray-600">
                <td className="p-3">{u.idStation}</td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.ubication.address}</td>
                <td className="p-3">{u.status}</td>
                <td className="p-3">{u.opening_date}</td>
                <td className="p-3 space-x-2">
                  <Button variant="primary" size="sm">Activar</Button>
                  <Button variant="secondary" size="sm">Inactivar</Button>
                  <Button variant="secondary" size="sm">Mantenimiento</Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="p-3 border-t text-sm flex justify-between items-center">
        <SmallText>Mostrando {stations.length} estaciones.</SmallText>

       
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(p) => setCurrentPage(p)}
          />
      
         
                
      </div>
    </div>
  );
}
