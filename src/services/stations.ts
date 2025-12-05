export async function createStation(data) {
  const res = await fetch("/api/mock/stations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function getStations() {
  const res = await fetch("/api/mock/stations");
  return await res.json();
}
