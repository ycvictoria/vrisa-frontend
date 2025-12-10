"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [userType, setUserType] = useState("");
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");
  const [color3, setColor3] = useState("");
  const [logo, setLogo] = useState<File | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleRegister = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMsg(error.message);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Panel izquierdo con formulario */}
      <div className="w-1/2 bg-white p-12 flex flex-col justify-center">
        
        <div className="w-full bg-[#3B4B8C] text-white py-4 rounded-md mb-10 text-center text-3xl font-bold">
          VRISA
        </div>

        <h2 className="text-3xl font-bold mb-2 text-gray-800">Crear cuenta</h2>
        <p className="text-gray-500 mb-8">
          Registra tu información para continuar
        </p>

        <form className="space-y-5">
          {/* Tipo de usuario */}
          <div>
            <label className="block font-semibold mb-1">Tipo de usuario</label>
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Institución</option>
              <option value="institucion">Institución</option>
              <option value="investigador">Investigador</option>
              <option value="tecnico">Técnico</option>
              <option value="ciudadano">Ciudadano</option>
            </select>
          </div>

          {/* Nombre */}
          <div>
            <label className="block font-semibold mb-1">Nombre Oficial</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg"
              placeholder="Ejm: Ambiental Unida"
            />
          </div>

          {/* Correo */}
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg"
              placeholder="example.email@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Logo */}
          <div>
            <label className="block font-semibold mb-1">Logo</label>
            <div className="flex items-center gap-3">
              <label className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg cursor-pointer font-semibold">
                Cancel
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                className="px-4 py-2 bg-[#3B4B8C] hover:bg-[#2d3a6e] text-white rounded-lg font-semibold"
              >
                Upload
              </button>
              {logo && (
                <span className="text-sm text-gray-600">{logo.name}</span>
              )}
            </div>
          </div>

          {/* Colores */}
          <div>
            <label className="block font-semibold mb-1">Colores</label>
            <div className="flex gap-3">
              <select
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option value="">Color 1</option>
                <option value="amarillo">Amarillo</option>
                <option value="azul">Azul</option>
                <option value="rojo">Rojo</option>
                <option value="blanco">Blanco</option>
              </select>

              <select
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option value="">Color 2</option>
                <option value="amarillo">Amarillo</option>
                <option value="azul">Azul</option>
                <option value="rojo">Rojo</option>
                <option value="blanco">Blanco</option>
              </select>

              <select
                value={color3}
                onChange={(e) => setColor3(e.target.value)}
                className="flex-1 p-3 border rounded-lg"
              >
                <option value="">Color 3</option>
                <option value="amarillo">Amarillo</option>
                <option value="azul">Azul</option>
                <option value="rojo">Rojo</option>
                <option value="blanco">Blanco</option>
              </select>
            </div>
          </div>

          {/* Contraseña */}
          <div>
            <label className="block font-semibold mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg"
              placeholder="Enter at least 8+ characters"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/auth/login")}
              className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-semibold transition"
            >
              Volver
            </button>
            <button
              type="button"
              onClick={handleRegister} // 🔹 Aquí llamamos a Supabase
              className="flex-1 bg-[#3B4B8C] hover:bg-[#2d3a6e] text-white py-3 rounded-lg font-semibold transition"
            >
              Crear Cuenta
            </button>
          </div>

          {msg && <p className="text-red-500 mt-2">{msg}</p>}
        </form>

        <p className="text-gray-600 text-sm mt-6">
          <strong>Después de crear la cuenta,</strong> se mandará el registro
          para su autorización.{" "}
          <strong>De ser autorizado, podrá acceder.</strong>
        </p>
      </div>

      {/* Panel derecho */}
      <div className="w-1/2 bg-[#3B4B8C] text-white flex flex-col items-center justify-center p-12">
        <h1 className="text-5xl font-bold mb-4">VRISA</h1>
        <p className="text-lg text-gray-200 text-center">
          Vigilancia de la red de inmisiones y sustancias atmosféricas de Cali
        </p>
      </div>
    </div>
  );
}