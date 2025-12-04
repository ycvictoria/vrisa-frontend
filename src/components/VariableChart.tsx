"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ChartCardProps {
  title: string;
  labels: string[];
  values: number[];
}

export default function ChartCard({ title, labels, values }: ChartCardProps) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md border">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <Line data={data} />
    </div>
  );
}

