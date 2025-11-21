import TrendsDashboard from "@/components/TrendsDashboard";

export default async function InstitutionTrendsPage() {
  try {
    const res = await fetch("http://localhost:3000/api/mock/auth/me", { cache: "no-store" });
    if (!res.ok) {
      return <div className="p-6">No se pudo obtener la sesión.</div>;
    }
    const user = await res.json();
    const role = user?.role ?? null;

    if (!(role === "institution" || role === "investigator" || role === "institucion" || role === "investigador")) {
      return <div className="p-6">No tienes permiso para ver esta página.</div>;
    }

    return (
      <div className="p-6">
        <TrendsDashboard role={role} />
      </div>
    );
  } catch (err) {
    return <div className="p-6">Error consultando sesión.</div>;
  }
}
