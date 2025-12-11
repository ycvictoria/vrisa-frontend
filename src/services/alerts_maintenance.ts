import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getStationAlerts(idStation: number) {
  const { data, error } = await supabase.rpc("get_station_alerts", {
    _station_id: idStation,
  });

  if (error) throw error;
  return data ?? [];
}

export async function getStationMaintenance(idStation: number) {
  const { data, error } = await supabase.rpc("get_station_maintenance", {
    _station_id: idStation,
  });

  if (error) throw error;
  return data ?? [];
}
