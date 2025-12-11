export function RoleBadge({ role }: { role: string }) {
  const colors: any = {
    admin: "bg-yellow-200 text-indigo-700",
    researcher: "bg-green-200 text-green-700",
    institution: "bg-blue-200 text-blue-700",
    citizen: "bg-purple-200 text-gray-700",
    station: "bg-green-400 text-gray-700",
    technician: "bg-red-100 text-gray-700",
   
  };

  return (
    <span className={`px-3 py-1 rounded-full text-md font-medium ${colors[role]}`}>
      {role}
    </span>
  );
}
