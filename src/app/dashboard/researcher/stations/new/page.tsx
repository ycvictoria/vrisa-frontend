"use client";

import { useState } from "react";
import { createStation } from "@/services/stations";

export default function NewStationPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
    description: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await createStation(form);
    alert("Estación guardada (mock)!");
  };

  return (
    <div className="flex justify-center items-start w-full p-8">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-3xl border border-gray-100">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Agregar Nueva Estación
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Nombre */}
          <div>
            <label className="block font-semibold mb-2">Nombre</label>
            <input
              type="text"
              name="name"
              placeholder="Ej. Estación Norte"
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ubicación */}
          <div>
            <label className="block font-semibold mb-2">Ubicación</label>
            <input
              type="text"
              name="address"
              placeholder="Ciudad, Región"
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white 
                         focus:ring-2 focus:ring-blue-500 outline-none transition"
              value={form.address}
              onChange={handleChange}
              required
            />
          </div>

          {/* Coordenadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Latitud</label>
              <input
                type="number"
                step="0.0001"
                name="latitude"
                placeholder="3.450"
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={form.latitude}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Longitud</label>
              <input
                type="number"
                step="0.0001"
                name="longitude"
                placeholder="-76.530"
                className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white 
                           focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={form.longitude}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Descripción */}
          <div>
            <label className="block font-semibold mb-2">Descripción</label>
            <textarea
              name="description"
              placeholder="Descripción opcional..."
              className="w-full px-4 py-3 border rounded-lg bg-gray-50 focus:bg-white 
                         focus:ring-2 focus:ring-blue-500 outline-none transition h-24"
              value={form.description}
              onChange={handleChange}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white 
                       font-semibold py-3 rounded-lg shadow-md"
          >
            Guardar Estación
          </button>
        </form>
      </div>
    </div>
  );
}
