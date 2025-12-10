"use client";

import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex bg-white">
      {/* PANEL IZQUIERDO */}
      <div className="w-1/2 flex flex-col justify-center px-24">
        <h1 className="text-3xl font-bold mb-8">Iniciar Sesión</h1>

        {/* Email */}
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          className="border rounded-lg px-4 py-2 mt-1 mb-4 w-full"
          placeholder="example@email.com"
        />

        {/* Password */}
        <label className="text-sm font-medium">Contraseña</label>
        <input
          type="password"
          className="border rounded-lg px-4 py-2 mt-1 mb-2 w-full"
          placeholder="Enter at least 8+ characters"
        />

        <div className="flex justify-between items-center text-sm mb-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Recuérdame
          </label>

          <a href="#" className="text-[#3B4B8C] hover:underline">
            ¿Olvidaste la contraseña?
          </a>
        </div>

        <button className="bg-[#3B4B8C] hover:bg-[#2d3a6e] text-white py-2 rounded-lg w-full">
          Entrar
        </button>

        <div className="text-sm text-gray-600 mt-4">
          ¿No tienes cuenta?
          <a href="/auth/register" className="text-[#3B4B8C] ml-1">
            Registrarse
          </a>
        </div>
      </div>

      {/* PANEL DERECHO */}
      <div className="w-1/2 bg-[#3B4B8C] flex items-center justify-center">
        <div className="text-center text-white">
          <Image
            src="/vrisa-logo-white.png"
            width={120}
            height={120}
            alt="Logo VRISA"
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold">VRISA</h1>
          <p className="mt-2 text-lg">
            Vigilancia de la Red de Inmisiones y Sustancias Atmosféricas de Cali
          </p>
        </div>
      </div>
    </div>
  );
}