"use client";

import { useEffect, useState } from "react";
import DateFilter, { DateFilterOption } from "@/components/DateFilter";
import ChartCard from "@/components/ChartCard";

type Meas = {
  time: string;   // ISO string o algo parseable por new Date()
  value: number;
};

export default function ChartVariables() {
  const [filter, setFilter] = useState<DateFilterOption>("today");
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<number[]>([]);

  // datos de ejemplo: asegúrate que time sea un ISO string
  const data: Meas[] = [
    { time: "2025-01-21T08:00:00Z", value: 18.2 },
    { time: "2025-01-21T09:00:00Z", value: 19.3 },
    { time: "2025-01-21T10:00:00Z", value: 20.1 },
    { time: "2025-01-21T11:00:00Z", value: 21.0 },
    { time: "2025-01-21T12:00:00Z", value: 22.5 },

    { time: "2025-11-21T12:00:00Z", value: 22.5 },

    { time: "2025-11-21T12:01:00Z", value: 23.5 },

    { time: "2025-11-21T12:02:00Z", value: 18.5 },

    { time: "2025-11-21T12:04:00Z", value: 39.5 },
  ];

  useEffect(() => {
    const now = new Date();
    let filtered: Meas[] = data;

    if (filter === "today") {
      filtered = data.filter((d) => {
        const dt = new Date(d.time);
        return dt.toDateString() === now.toDateString();
      });
    }

    if (filter === "last2hours") {
      const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);
      filtered = data.filter((d) => new Date(d.time) >= twoHoursAgo);
    }

    if (filter === "thisweek") {
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      filtered = data.filter((d) => new Date(d.time) >= weekAgo);
    }

    if (filter === "thismonth") {
      const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      filtered = data.filter((d) => new Date(d.time) >= monthAgo);
    }

    // Guardias y formateo seguro
    const safeLabels: string[] = filtered.map((d) => {
      const dt = new Date(d.time);
      if (isNaN(dt.getTime())) return "Fecha inválida";
      // formatea a hora corta; ajusta locale si quieres
      return dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    });

    const safeValues: number[] = filtered.map((d) => {
      // si value no es number, intenta parsearlo o usa NaN/0
      const val = typeof d.value === "number" ? d.value : Number(d.value);
      return Number.isFinite(val) ? val : NaN;
    });

    setLabels(safeLabels);
    setValues(safeValues);
  }, [filter]);

  return (
    <div className="space-y-4 px-4">
      <DateFilter value={filter} onChange={setFilter} />

      <ChartCard
        title="Temperatura (°C)"
        labels={labels}
        values={values}
        color="rgba(29, 192, 233, 1)"
      />
    </div>
  );
}
