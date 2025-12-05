export default function AdminPage() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Módulo de Administración</h2>

      <h2 className="text-xl font-semibold mb-4">BIENVENIDO ADMIN</h2>
      

      <ul className="space-y-3">
        <li className="p-4 bg-white rounded-xl border shadow-sm">
          <a href="dashboard/admin/users">Administrar usuarios</a>
        </li>
        <li className="p-4 bg-white rounded-xl border shadow-sm">
          <a href="dashboard/admin/stations">Administrar estaciones</a>
        </li>
      </ul>
    </div>
  );
}