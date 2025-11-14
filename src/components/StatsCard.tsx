export function StatsCard({ title, value, icon }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex justify-between">
        <p className="text-gray-600 text-sm">{title}</p>
        <span>{icon}</span>
      </div>
      <p className="mt-3 text-3xl text-gray-400 font-semibold">{value}</p>
    </div>
  );
}
