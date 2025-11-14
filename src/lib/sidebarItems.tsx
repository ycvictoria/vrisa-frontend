export const sidebarItems: any = {
  admin: [
    { name: "Gestión de Usuarios", href: "/admin/users", icon: "👨🏻‍💻" },
    { name: "Autorización de Estaciones", href: "/admin/stations", icon: "🖥️" },
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
    { name: "Datos", href: "/investigador/datos", icon: "📊" },
    { name: "Reportes", href: "/investigador/reportes", icon: "📈" },
  ],
  ciudadano: [
    { name: "Información Pública", href: "/ciudadano/info", icon: "🌍" },
    { name: "Mapa de Estaciones", href: "/ciudadano/mapa", icon: "📍" },
  ],
};
