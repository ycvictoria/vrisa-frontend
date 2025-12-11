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

