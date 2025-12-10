import { supabase } from "@/lib/supabaseClient";

export async function getAllUsers() {
  const { data, error } = await supabase.rpc("get_users");
  if (error) throw error;
  return data;
}
export async function createUser(payload: {
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}) {
  const { email, first_name, last_name, role } = payload;

  const { data, error } = await supabase.rpc("create_user", {
    _email: email,
    _first_name: first_name,
    _last_name: last_name,
    _role: role,
    // los defaults no es necesario enviarlos:
    // _authorization_status: "pendiente",
    // _account_status: "inactivo",
  });

  if (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }

  return data; // esto será la fila retornada por la función

}

//autorizar registros usuario nuevo
export async function authorizeUser(id: number) {
  const { error } = await supabase.rpc("authorize_user_registration", { _id: id });
  if (error) throw error;
}


//rechazar registros usuario nuevo
export async function rejectUser(id: number) {
  const { error } = await supabase.rpc("reject_user_registration", { _id: id });
  if (error) throw error;
}


//cambiar estado cuenta: activar 
export async function activateUser(id: number) {
  const { error } = await supabase.rpc("activate_user", { p_iduser: id });
  if (error) throw error;
}

//
//cambiar estado cuenta: inactivar 
export async function deactivateUser(id: number) {
  const { error } = await supabase.rpc("deactivate_user", { p_iduser: id });
  if (error) throw error;
}




//variables por cada estación
export async function getVariablesByStations(stationIds: number[]) {
  const { data, error } = await supabase.rpc("get_variables_by_stations", {
    station_ids: stationIds.length > 0 ? stationIds : null
  });

  if (error) throw error;
  return data;
}

export async function getAllStations() {
  const { data, error } = await supabase.rpc("get_all_stations");

  if (error) throw error;
  return data;
}

export async function getVariablesGroupedByStation(stationIds: number[]) {
  const { data, error } = await supabase.rpc(
    "get_variables_grouped_by_station",
    { station_ids: stationIds }
  );

  if (error) throw error;
  return data;
}

//para seccion de reportes: busqueda mediciones segun filtros
export async function getStationReport(payload: {
  stations: number[];
  variables: number[];
  since: string;
  until: string;
}) {
  const { stations, variables, since, until } = payload;

  const { data, error } = await supabase.rpc("get_station_report", {
    stations,
    variables,
    since_timestamp: since,
    until_timestamp: until
  });

  if (error) throw error;
  return data;
}


