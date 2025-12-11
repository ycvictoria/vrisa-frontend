"use client";
import { useEffect, useState } from "react";
import type { Researcher } from "@/types/data_types";

export default function ResearchersPage() {
  const [researchers, setResearchers] = useState<Researcher[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("/api/mock/researchers");
      const data: Researcher[] = await res.json();

      const filtered = data.filter(
        (u: Researcher) => u.role === "researcher" || u.role === "institution"
      );

      setResearchers(filtered);
    };

    load();
  }, []);
}
