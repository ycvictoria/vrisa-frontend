"use client";

import { useEffect, useRef } from "react";
import Button from "@/components/Button";

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

interface LineChartProps {
  canvasId: string;
  labels: string[];
  datasets: any[];
  title?: string;
}

export default function LineChart({ canvasId, labels, datasets, title }: LineChartProps) {
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    // Destruir gráfico previo
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Crear gráfico nuevo
    chartRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels,
        datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
        },
        scales: {
          x: {
            ticks: { maxRotation: 90, minRotation: 45 },
          },
        },
      },
    });
  }, [labels, datasets, canvasId]);

  // ------------------------
  // Guardar imagen
  // ------------------------
  const guardarImagen = () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${title ?? "grafico"}.png`;
    link.href = url;
    link.click();
  };

  // ------------------------
  // Copiar imagen
  // ------------------------
  const copiarImagen = async () => {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    canvas.toBlob(async (blob) => {
      try {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob! })]);
        alert("Imagen copiada al portapapeles");
      } catch (err) {
        alert("No se pudo copiar la imagen");
      }
    });
  };

  return (
    <div className="mb-10 border p-4 rounded shadow-sm bg-white">
      {title && <h3 className="text-lg font-semibold mb-2 text-sky-600">{title}</h3>}

      <canvas id={canvasId} height="120"></canvas>

      <div className="flex gap-3 mt-3">
        <Button className="bg-gray-200 px-3 py-1 rounded" onClick={guardarImagen}>
          Guardar Imagen
        </Button>

        <Button className="bg-sky-500 text-white px-3 py-1 rounded" onClick={copiarImagen}>
          Copiar Imagen
        </Button>
      </div>
    </div>
  );
}
