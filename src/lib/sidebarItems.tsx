export const sidebarItems: any = {
  dev: [
    { name: "Gestión de Usuarios", href: "admin/users", icon: "👨🏻‍💻" },
    { name: "Mis estaciones", href: "researcher/stations", icon: "📊" },
    { name: "Reportes", href: "researcher/reports", icon: "📈" },
    { name: "Permisos de Investigadores", href: "admin/stations/researcher", icon: "📝" },
    { name: "Ver estaciones públicas", href: "citizen", icon: "🌍" },
   { name: "Usuarios de estación", href: "station/:id/users_network", icon: "👥" },
  { name: "Alertas y mantenimiento", href: "station/:id/alerts_and_maintenance", icon: "⚠️" },
 
],

  researcher: [
    { name: "Mis estaciones", href: "researcher/stations", icon: "📊" },
    { name: "Reportes", href: "researcher/reports", icon: "📈" },

  ],

  institution: [
   // { name: "Mis estaciones", href: "institution/stations/1", icon: "🏭" },
     { name: "Permisos de Investigadores", href: "admin/stations/researcher", icon: "📝" },
    { name: "Reporte de estaciones", href: "institution/reports", icon: "📥" },
  ],
station: [
  { name: "Usuarios de estación", href: "station/:id/users_network", icon: "👥" },
  { name: "Alertas y mantenimiento", href: "station/:id/alerts_and_maintenance", icon: "⚠️" },
],
  citizen: [
    { name: "Ver estaciones públicas", href: "citizen", icon: "🌍" }
  ],

  admin:[
    
    { name: "Gestión de Usuarios", href: "admin/users", icon: "👨🏻‍💻" },
     { name: "Reportes", href: "researcher/reports", icon: "📈" },
      { name: "Ver estaciones públicas", href: "citizen", icon: "🌍" },
  ]

};
