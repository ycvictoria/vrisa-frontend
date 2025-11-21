import TrendsDashboard from "@/components/TrendsDashboard";
import { useSession } from "@/context/SessionContext";

export default function InvestigatorTrendsPage() {
  const user = useSession();
  const role = user?.role ?? null;

  if (!(role === "investigador" || role === "institucion")) {
    return <div className="p-6">No tienes permiso para ver esta página.</div>;
  }

  return (
    <div className="p-6">
      <TrendsDashboard role={role} />
    </div>
  );
}
