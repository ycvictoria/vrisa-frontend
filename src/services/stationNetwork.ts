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


// 1️⃣ Todas las estaciones
export async function getAllStations() {
  const { data, error } = await supabase
    .from("station")
    .select("*, ubication(*)");

  if (error) throw error;
  return data;
}

// 2️⃣ Red del investigador (estaciones asociadas)
export async function getResearcherNetworkStations(idUser: number) {
  const { data, error } = await supabase.rpc(
    "get_researcher_network_stations",
    { _iduser: idUser }
  );

  if (error) throw error;
  return data;
}

// 3️⃣ Alternar entrar/salir de una estación
export async function toggleResearcherStationMembership(
  idUser: number,
  idStation: number
) {
  const { data, error } = await supabase.rpc(
    "toggle_researcher_station",
    {
      _iduser: idUser,
      _idstation: idStation
    }
  );

  if (error) throw error;
  return data;
}
//estaciones con acceso para el jusuario
export async function getUserNetwork(userId: number) {
  const { data, error } = await supabase.rpc("get_user_network", {
    _user_id: userId,
  });

  if (error) throw error;
  return data;

}

//para hacer request de autorizacion a estacion 
export async function requestJoinStation(userId: number, stationId: number) {
  const { data, error } = await supabase.rpc("request_join_station", {
    _user_id: userId,
    _station_id: stationId,
  });

  if (error) throw error;
  return data;
}

//request estaciones con  acceso aprobado a estacion
export async function getApprovedStations(userId: number) {
  const { data, error } = await supabase.rpc("get_user_approved_stations", {
    _user_id: userId,
  });

  if (error) throw error;
  return data;
}
export async function getPendingRequests(userId: number) {
  const { data, error } = await supabase.rpc("get_user_pending_requests", {
    _user_id: userId,
  });
  if (error) throw error;
  return data;
}
