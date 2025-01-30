export const Permissions = {
  administrador: [
    { name: "Dashboard", path: "/dashboard", component: "Dashboard" },
    { name: "Usuarios", path: "/users", component: "Users" },
    { 
      name: "Proyectos", 
      path: "/projects", 
      component: "Projects",
      subMenu: [
        { name: "Categorías", path: "/projects/categories", component: "ProjectCategories" },
        { name: "Tipos de Proyecto", path: "/projects/types", component: "ProjectTypes" }
      ]
    },
    { name: "Tickets", path: "/tickets", component: "Tickets" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" },
  ],
  creador: [
    { name: "Dashboard", path: "/dashboard", component: "Dashboard" },
    { name: "Proyectos", path: "/projects", component: "Projects" },
  ],
  usuario: [
    { name: "Dashboard", path: "/dashboard", component: "Dashboard" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" },
  ],
  soporte: [
    { name: "Dashboard", path: "/dashboard", component: "Dashboard" },
    { name: "Tickets", path: "/tickets", component: "Tickets" },
  ],
};
