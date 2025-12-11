export const sidebarItems: Record<string, any[]> = {
  dev: [
    { name: "Gestión de Usuarios", href: "/dashboard/admin/users", icon: "👨🏻‍💻" },
    { name: "Investigadores y Estaciones", href: "/dashboard/admin/stations/researcher", icon: "👩‍🔬" },

    // Researcher sections
    { name: "Mis estaciones", href: "/dashboard/researcher/stations", icon: "📊" },
    { name: "Reportes", href: "/dashboard/researcher/reports", icon: "📈" },
    { name: "Tendencias y Alertas", href: "/dashboard/researcher/TrendsDashboard", icon: "📊" },

    // Station sections (redirigirán según ID)
    { name: "Mi estación", href: "/dashboard/station", icon: "📡" },
    { name: "Solicitudes estación", href: "/dashboard/station/users_network", icon: "📩" },
    { name: "Alertas & Mantenimiento", href: "/dashboard/station/alerts_and_maintenance", icon: "🛠️" },
  ],

  admin: [
    { name: "Gestión de Usuarios", href: "/dashboard/admin/users", icon: "👨🏻‍💻" },
    { name: "Investigadores y Estaciones", href: "/dashboard/admin/stations/researcher", icon: "👩‍🔬" },

    // Admin también puede ver reportes
    { name: "Reportes", href: "/dashboard/researcher/reports", icon: "📈" },
  ],

  station: [
    { name: "Mi estación", href: "/dashboard/station", icon: "📡" },
    { name: "Solicitudes", href: "/dashboard/station/users_network", icon: "📩" },
    { name: "Alertas & Mantenimiento", href: "/dashboard/station/alerts_and_maintenance", icon: "🛠️" },
  ],

  institution: [
    { name: "Inicio", href: "/dashboard/institution", icon: "🏢" },
    { name: "Investigadores", href: "/dashboard/institution/researchers", icon: "👩‍🔬" },
  ],

  researcher: [
    { name: "Mi Perfil", href: "/dashboard/researcher/perfil", icon: "👤" },
    { name: "Mis estaciones", href: "/dashboard/researcher/stations", icon: "📊" },
    { name: "Reportes", href: "/dashboard/researcher/reports", icon: "📈" },
    { name: "Tendencias y Alertas", href: "/dashboard/researcher/TrendsDashboard", icon: "📊" },
  ],

  citizen: [
    { name: "Información Pública", href: "/dashboard/citizen/info", icon: "🌍" },
    { name: "Mapa de Estaciones", href: "/dashboard/citizen/map", icon: "📍" },
  ],
};
