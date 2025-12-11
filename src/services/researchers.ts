export async function getResearchers() {
  const res = await fetch("/api/mock/researchers"); 
  if (!res.ok) throw new Error("Error al obtener investigadores");
  return res.json();
}
