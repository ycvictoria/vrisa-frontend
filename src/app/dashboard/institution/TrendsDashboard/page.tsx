import TrendsDashboard from "@/components/TrendsDashboard";
import { useSession } from "@/context/SessionContext";

export default function InstitutionTrendsPage() {
  const user = useSession();
  const role = user?.role ?? null;

  // Si no es institución o investigador, mostrar not allowed (puedes redirigir)
  if (!(role === "institucion" || role === "investigador")) {
    return <div className="p-6">No tienes permiso para ver esta página.</div>;
  }

  return (
    <div className="p-6">
      <TrendsDashboard role={role} />
    </div>
  );
}
