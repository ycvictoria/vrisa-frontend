export const sidebarItems: any = {
  dev: [
    { name: "Gestión de Usuarios", href: "/admin/users", icon: "👨🏻‍💻" },
    { name: "Autorización de Estaciones", href: "/admin/stations", icon: "🖥️" },
    { name: "Mis estaciones", href: "/researcher/stations", icon: "📊" },
    { name: "Reportes", href: "/researcher/reports", icon: "📈" },
    { name: "Permisos de Investigadores", href: "/admin/stations/researcher", icon: "📝" },
    { name: "Ver estaciones públicas", href: "/citizen", icon: "🌍" },
    
  ],

  researcher: [
    { name: "Mis estaciones", href: "/researcher/stations", icon: "📊" },
    { name: "Reportes", href: "/researcher/reports", icon: "📈" },
  ],

  institution: [
    { name: "Mis estaciones", href: "/institution/stations", icon: "🏭" },
    { name: "Solicitudes", href: "/institution/requests", icon: "📥" },
  ],

  citizen: [
    { name: "Ver estaciones públicas", href: "/citizen", icon: "🌍" },
    { name: "Enviar reporte", href: "/citizen/report", icon: "🗒️" },
  ],
};