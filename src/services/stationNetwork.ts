import { supabase } from "@/lib/supabaseClient";

export async function getUsersByStation(stationId: number) {
  const { data, error } = await supabase.rpc("get_users_by_station", {
    _station_id: stationId,
  });
  if (error) throw error;
  return data ?? [];
}

export async function approveUser(stationId: number, userId: number) {
  return supabase.rpc("approve_network_user", {
    _station_id: stationId,
    _user_id: userId,
  });
}

export async function rejectUser(stationId: number, userId: number) {
  return supabase.rpc("reject_network_user", {
    _station_id: stationId,
    _user_id: userId,
  });
}

export async function activateUser(stationId: number, userId: number) {
  return supabase.rpc("activate_network_user", {
    _station_id: stationId,
    _user_id: userId,
  });
}

export async function deactivateUser(stationId: number, userId: number) {
  return supabase.rpc("deactivate_network_user", {
    _station_id: stationId,
    _user_id: userId,
  });
}


export async function getStationNetworkUsers(stationId: number) {
  const { data, error } = await supabase.rpc(
    "get_station_network_users",
    { _station_id: stationId }
  );

  if (error) {
    console.error("RPC ERROR getStationNetworkUsers:", error);
    return [];
  }

  return data ?? [];
}

//cambiar el acceso del usuario a la estacion : inactivar o activar.
export async function toggleUserStatus(stationId: number, userId: number) {
  const { error } = await supabase.rpc("toggle_station_user_status", {
    _station_id: stationId,
    _user_id: userId
  });

  if (error) throw error;
}

