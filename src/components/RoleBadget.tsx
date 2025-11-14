export function RoleBadge({ role }: { role: string }) {
  const colors: any = {
    Admin: "bg-indigo-100 text-indigo-700",
    Investigador: "bg-green-100 text-green-700",
    Institution: "bg-blue-100 text-blue-700",
    Citizen: "bg-gray-200 text-gray-700",
    Inactivo: "bg-red-100 text-red-700",
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[role]}`}>
      {role}
    </span>
  );
}
