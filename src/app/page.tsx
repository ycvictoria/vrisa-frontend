import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data, error } = await supabase.from("postgres").select("version()");

  console.log("DATA:", data);
  console.log("ERROR:", error);

  return (
    <div>
      <h1>Conexión OK ✔️</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
