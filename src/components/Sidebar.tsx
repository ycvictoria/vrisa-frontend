"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/lib/sidebarItems";
import { useSession } from "@/context/SessionContext";
import { Subtitle } from "./Text";

export default function Sidebar() {
  const path = usePathname();
  const user = useSession();

  const role = user?.role ?? "citizen";
  const stationId = user?.stationId ?? "1";

  let items: any[] = [];

  // 🔥 DEV VE TODO
  if (role === "dev") {
    items = [
      ...sidebarItems.dev
     // ...sidebarItems.researcher,
      //...sidebarItems.institution,
      //...sidebarItems.citizen,
     // ...sidebarItems.station,
    ];
  } else {
    // Normal segun rol
    items = sidebarItems[role] ?? [];

    // Si tiene estación, agregar menú station
    if (user?.stationId) {
      items = [...items, ...sidebarItems.station];
    }
  }

  return (
    <aside className="w-64 bg-white border-r p-6 space-y-6">
      <nav className="space-y-2">
         <Subtitle>{role}</Subtitle>
        {items.map(
          (item: { name: string; href: string; icon?: string }, idx: number) => {
            let finalHref = item.href.includes(":id")
              ? item.href.replace(":id", stationId)
              : item.href;

            finalHref = `/dashboard/${finalHref}`;

            return (
              <Link
                key={idx}
                href={finalHref}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl ${
                  path.startsWith(finalHref)
                    ? "bg-sky-600 text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span>{item.icon}</span>
                {item.name}
              </Link>
            );
          }
        )}
      </nav>
     
    </aside>
  );
}
