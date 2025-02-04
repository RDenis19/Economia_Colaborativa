// src/auth/Permissions.js
export const Permissions = {
  administrador: [
    { name: "Dashboard", path: "/dashboard", component: "DashboardAdmin" },
    { name: "Usuarios", path: "/users", component: "Users" },
    { 
      name: "Proyectos", 
      path: "/projects", 
      component: "ProjectsAdmin",
      subMenu: [
        { name: "Categorías", path: "/projects/categories", component: "ProjectCategories" },
        { name: "Tipos de Proyecto", path: "/projects/types", component: "ProjectTypes" }
      ]
    },
    { name: "Tickets", path: "/tickets", component: "Tickets" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" },
  ],
  creador: [
    { name: "Dashboard", path: "/dashboard", component: "DashboardCreator" },
    { name: "Proyectos", path: "/projects", component: "ProjectsCreator" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" }
  ],
  usuario: [
    { name: "Dashboard", path: "/dashboard", component: "DashboardUser" },
    { name: "Proyectos", path: "/projects", component: "ProjectsUser" },
    { name: "Inversiones", path: "/investments", component: "Investments" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" }
  ],
  soporte: [
    { name: "Proyectos", path: "/projects", component: "ProjectsUser" },
    { name: "Tickets", path: "/tickets", component: "Tickets" },
    { name: "Notificaciones", path: "/notifications", component: "Notifications" }
  ],
};
