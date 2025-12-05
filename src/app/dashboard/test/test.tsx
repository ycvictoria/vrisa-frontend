import { supabase } from "@/lib/supabaseClient";

export default async function Home() {
  const { data, error } = await supabase.from("User").select("*");

  console.log(data, error);

  return <div>Conectado a Supabase ✔️
    <div>{data}</div>
  </div>;
}