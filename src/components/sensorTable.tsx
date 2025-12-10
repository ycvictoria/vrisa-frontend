"use client";

export default function SensorsTable({ sensors }: any) {
  return (
    <div className="mt-6 border rounded-xl shadow-sm overflow-hidden">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Sensor</th>
            <th className="px-4 py-2 text-left">Modelo</th>
            <th className="px-4 py-2 text-left">Tipo</th>
            <th className="px-4 py-2 text-left">Estado</th>
            <th className="px-4 py-2 text-left">Instalación</th>
          </tr>
        </thead>

        <tbody>
          {sensors.map((s: any) => (
            <tr key={s.idsensor} className="border-b hover:bg-gray-50">
              <td className="px-4 py-3">{s.brand}</td>
              <td className="px-4 py-3">{s.model}</td>
              <td className="px-4 py-3">{s.type}</td>
              <td className="px-4 py-3 capitalize">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    s.status === "active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {s.status}
                </span>
              </td>
              <td className="px-4 py-3">
                {new Date(s.installation_date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
