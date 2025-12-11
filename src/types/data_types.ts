// ======================================================
// ENUMS
// ======================================================

export type Role =
  | "admin"
  | "researcher"
  | "institution"
  | "station"
  | "citizen"
  | "technician";

export type AuthorizationStatus = "pendiente" | "aprobado" | "rechazado";

export type AccountStatus = "activo" | "inactivo" | "suspendido";

export type StationStatus = "activa" | "inactiva" | "mantenimiento";

export type MeasurementCategory = "meteorologica" | "contaminante";


// ======================================================
// USER
// ======================================================

export interface User {
  iduser: number;
  auth_id: string | null; // puede venir null en mock
  email: string;
  first_name: string;
  last_name: string;
  role: Role;
  registration_date: string;
  authorization_status: AuthorizationStatus;
  account_status: AccountStatus;
}

export interface Researcher {
  id: number;
  iduser?: number;
  name: string;
  first_name?: string | null;
  last_name?: string | null;
  email?: string | null;
  role: "researcher" | "institution" | string;
  status: string;
  authorization_status?: string;
  registration_date?: string;
  created_at?: string;
}


export interface Ubication {
  latitude: number;
  longitude: number;

// ======================================================
// SESSION LOG (antes login)
// ======================================================

export interface SessionLog {
  id: number;
  idUser: number;
  login_time: string;
  user_agent: string | null;
  ip_address: string | null;
}


// ======================================================
// INSTITUTION
// ======================================================

export interface Institution {
  idInstitution: number;
  name: string;
  logo: string;
  address: string;
  idUser: number; // owner
}


// ======================================================
// COLOR (1:1 institution)
// ======================================================

export interface Color {
  idInstitution: number;
  color_1: string;
  color_2: string;
  color_3: string;
}


// ======================================================
// RESEARCH FROM INSTITUTION (N:N)
// ======================================================

export interface ResearchFromInstitution {
  idInstitution: number;
  idUser: number;
  state: string;
  date_issue: string;
}


// ======================================================
// DOCUMENT ID (1:1 user)
// ======================================================

export interface DocumentID {
  idUser: number;
  document_type: string;
  document_number: string;
}


// ======================================================
// STATION
// ======================================================


export interface Station {
  idstation: number;
  name: string;
  status: StationStatus;
  opening_date: string;
  closing_date: string | null;
  idTechnician: number;
  ubication?: Ubication; // opcional porque viene de JOIN
}


// ======================================================
// UBICATION (1:1 station)
// ======================================================

export interface Ubication {
  idStation: number;
  latitude: number;
  longitude: number;
  address: string;
}


// ======================================================
// SENSOR
// ======================================================

export interface Sensor {
  idSensor: number;
  brand: string;
  model: string;
  type: string;
  status: string;
  installation_date: string;
  idStation: number;
}


// ======================================================
// VARIABLE
// ======================================================

export interface Variable {
  idVariable: number;
  name: string;
  category: MeasurementCategory;
  description: string;
  measurement_unit: string;
  range_min: number;
  range_max: number;
}


// ======================================================
// MEASUREMENT
// ======================================================

export interface Measurement {
  idMeasurement: number;
  value: number;
  timestamp_measure: string;
  idSensor: number;
  idParameter: number; // variable ID
}


// ======================================================
// MAINTENANCE
// ======================================================

export interface Maintenance {
  idMaintenance: number;
  maintenance_date: string;
  type_maintenance: string;
  description: string;
  certificated_documents_url: string;
  technician_in_charge: number;
  idSensor: number;
}


// ======================================================
// ALERT
// ======================================================

export interface Alert {
  idAlert: number;
  alert_type: string;
  level: string;
  description: string;
  issued_date: string;
  idMeasurement: number;
}


// ======================================================
// NETWORK USER STATION (N:N)
// ======================================================

export interface NetworkUserStation {
  idUser: number;
  idStation: number;
  date_issue: string;
  date_registration: string;
  status: string;
}


// ======================================================
// AUDIT LOGS
// ======================================================

// USER ACTION LOG
export interface AuditUsersLog {
  idAudit: number;
  type_action: string;
  date_issue: string;
  idAdmin: number;
  idUser: number;
  notes: string;
}

// RESEARCHER <-> INSTITUTION LOG
export interface AuditResearcherInstitutionLog {
  idInstitution: number;
  idUser: number;
  type_action: string;
  date_issue: string;
  notes: string;
}

// NETWORK LOG
export interface AuditNetworkLog {
  idAuditNetwork: number;
  idUser: number;
  idStation: number;
  date_issue: string;
  type_action: string;
  notes: string;
}

// USERDATA CHANGES
export interface AuditUserDataChangesLog {
  idUserChange: number;
  idUser: number;
  type_action: string;
  date_issue: string;
  notes: string;
}

