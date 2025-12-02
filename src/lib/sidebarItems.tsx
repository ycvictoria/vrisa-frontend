export const sidebarItems: any = {
  admin: [
    { name: "Gestión de Usuarios", href: "/admin/users", icon: "👨🏻‍💻" },
    { name: "Autorización de Estaciones", href: "/admin/stations", icon: "🖥️" },
    { name: "Gestión de Investigadores", href: "/admin/stations/researcher", icon: "👩‍🔬" },
    // solo lo agrego para que lo vean 1 vez ya que da erro por que es diferente direccion  si les da error comentenlo
    { name: "Mi Perfil", href: "/dashboard/researcher", icon: "👤" }, 
  ],
  estacion: [
    { name: "Solicitudes", href: "/estacion/solicitudes", icon: "📩" },
    { name: "Mantenimiento", href: "/estacion/mantenimiento", icon: "🛠️" },
  ],
  institucion: [
    { name: "Investigadores", href: "/institucion/investigadores", icon: "👩‍🔬" },
    { name: "Permisos", href: "/institucion/permisos", icon: "📝" },
  ],

  investigador: [
  { name: "Mi Perfil", href: "/dashboard/researcher", icon: "👤" },
  { name: "Gestión de Mis Estaciones", href: "/dashboard/researcher/stations", icon: "📡" },
  { name: "Generación de Reportes", href: "/dashboard/researcher/reportes", icon: "📄" },
  { name: "Tendencias, Alertas y Mantenimiento", href: "/dashboard/researcher/trends", icon: "📊" }
  ],
  ciudadano: [
    { name: "Información Pública", href: "/ciudadano/info", icon: "🌍" },
    { name: "Mapa de Estaciones", href: "/ciudadano/mapa", icon: "📍" },
  ],
};
