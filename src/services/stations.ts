export async function createStation(data:any) {
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

// src/services/stations.ts
import { supabase } from "@/lib/supabaseClient";

// =======================================================
// 1️⃣ OBTENER ESTACIÓN POR ID
// =======================================================
export async function getStationById(id: number) {
  const { data, error } = await supabase.rpc("get_data_station_by_id", { _id: id });

  if (error) {
    console.error("Error cargando estación:", error);
    throw error;
  }

  return data?.[0] ?? null;
}

// =======================================================
// 2️⃣ OBTENER UBICACIÓN DE ESTACIÓN
// =======================================================
export async function getStationUbication(id: number) {
  const { data, error } = await supabase.rpc("get_station_ubication", { _id: id });

  if (error) {
    console.error("Error cargando ubicación:", error);
    throw error;
  }

  return data?.[0] ?? null;
}

// =======================================================
// 3️⃣ OBTENER SENSORES ASOCIADOS A UNA ESTACIÓN
// =======================================================
export async function getSensorsByStation(id: number) {
  const { data, error } = await supabase.rpc("get_sensors_by_station", { _id: id });

  if (error) {
    console.error("Error cargando sensores:", error);
    throw error;
  }

  return data ?? [];
}

// =======================================================
// 4️⃣ OBTENER VARIABLES REALMENTE MEDIDAS POR LA ESTACIÓN
// =======================================================
export async function getVariablesByStation(id: number) {
  const { data, error } = await supabase.rpc("get_variables_by_station", { _id: id });

  if (error) {
    console.error("Error cargando variables:", error);
    throw error;
  }

  return data ?? [];
}


//variables por varias estaciones por  ids[]
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





//para datos chart historico de varibales
export async function getStationVariableHistory(
  stationId: number,
  variableId: number,
  since: string,
  until: string
) {
  const { data, error } = await supabase.rpc("get_station_variable_history", {
    _station_id: stationId,
    _variable_id: variableId,
    _since: since,
    _until: until,
  });

  if (error) {
    console.error("Error cargando historial de variable:", error);
    throw error;
  }

  return data ?? [];
}

// ultima medicion de esa variable x estacion
export async function getLastMeasurementsByStation(stationId: number) {
  const { data, error } = await supabase.rpc(
    "get_last_measurements_by_station",
    { p_station: stationId }
  );

  if (error) {
    console.error("Error obteniendo últimas mediciones:", error);
    throw error;
  }

  return data;
}
