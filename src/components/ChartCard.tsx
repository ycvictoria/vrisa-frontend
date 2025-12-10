"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ChartCard({
  title,
  labels,
  values,
  color = "rgba(54, 162, 235, 1)",
}: {
  title: string;
  labels: string[];
  values: number[];
  color?: string;
}) {
  const data = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        borderColor: color,
        backgroundColor: `${color}33`,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: { beginAtZero: false },
    },
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 w-full h-72 ">
      <h2 className="font-semibold text-sky-500 text-xl mb-2">{title}</h2>
      <div className="h-[250px] ">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
