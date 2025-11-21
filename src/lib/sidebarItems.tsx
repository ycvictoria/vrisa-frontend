export const sidebarItems: any = {
  admin: [
    { name: "Gestión de Usuarios", href: "/admin/users", icon: "👨🏻‍💻" },
    { name: "Autorización de Estaciones", href: "/admin/stations", icon: "🖥️" },
    { name: "Módulo de Gestión de Investigadores", href: "/admin/stations/researcher", icon: "👩‍🔬" },
  ],
  estacion: [
    { name: "Solicitudes", href: "/estacion/solicitudes", icon: "📩" },
    { name: "Mantenimiento", href: "/estacion/mantenimiento", icon: "🛠️" },
  ],
  institucion: [
    { name: "Investigadores", href: "/institution/investigadores", icon: "👩‍🔬" },
    { name: "Permisos", href: "/institution/permisos", icon: "📝" },
    { name: "Tendencias, Alertas y Mantenimiento", href: "/institution/TrendsDashboard", icon: "📊" },
  ],
investigador: [
  { name: "Mi Perfil", href: "/researcher/perfil", icon: "👤" },
  { name: "Gestión de Mis Estaciones", href: "/dashboard/researcher", icon: "📡" }, 
  { name: "Generación de Reportes", href: "/researcher/reportes", icon: "📄" },
  { name: "Tendencias, Alertas y Mantenimiento", href: "/researcher/TrendsDashboard", icon: "📊" }
],
  ciudadano: [
    { name: "Información Pública", href: "/ciudadano/info", icon: "🌍" },
    { name: "Mapa de Estaciones", href: "/ciudadano/mapa", icon: "📍" },
  ],
};
