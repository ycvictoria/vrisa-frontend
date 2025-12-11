"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/lib/sidebarItems";
import { useSession } from "@/context/SessionContext";
import { Subtitle, Title } from "./Text";

import { CloudRain } from "lucide-react";

export default function Sidebar() {
  const path = usePathname();
  const user = useSession(); // ← información del usuario desde contexto global

  const role = user?.role ?? "ciudadano";
  const items = sidebarItems[role] || [];

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6">
      <Title>VRISA</Title>   
        {/* Icono */}
      <CloudRain
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
      />

     
      <nav className="space-y-2">
        {items.map((item: any, idx: number) => (
          <Link
            key={idx}
            href={`${item.href}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
              path.includes(item.href)
                ? "bg-sky-600 text-white"
                : "hover:bg-gray-100 text-gray-700"
            }`}
          >
            <span>{item.icon}</span>
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
