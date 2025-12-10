export interface User {
  idUser: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  status: string;
  last_access?: string | null;
}

export interface Researcher {
  id?: number;
  first_name?: string | null;
  last_name?: string | null;
  name?: string; // <- añadido
  role?: string;
  status?: string;
  authorization_status?: string;
  created_at?: string;
  registration_date?: string;
}

export interface Ubication {
  latitude: number;
  longitude: number;
  address: string;
}

export type StationStatus = "active" | "inactive" | "maintenance";


export interface Station {
  idStation: number;
  name: string;
  status: StationStatus;
  opening_date: string; // ISO date string
  closing_date: string | null; // puede ser null si aún está abierta
  idTechnician: number;
  ubication: Ubication;
}

