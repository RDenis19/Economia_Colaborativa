import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
/* import { isTokenExpired } from "./utils/authUtils"; */

// Componentes generales
import Sidebar from "./components/layouts/Sidebar";
import Header from "./components/layouts/Header";
import Login from "./modules/Login/Login";

// Layouts específicos
import AdminLayout from "./components/layouts/AdminLayout";
import PrestamistaLayout from "./components/layouts/PrestamistaLayout";
import PrestatarioLayout from "./components/layouts/PrestatarioLayout";
import SoporteLayout from "./components/layouts/SoporteLayout";

// Módulos del Administrador
import DashboardAdmin from "./modules/Admin/Dashboard/Dashboard";
import Usuarios from "./modules/Admin/Usuarios/Usuarios";
import ProyectosAdmin from "./modules/Admin/Proyectos/Proyectos";
import TicketsAdmin from "./modules/Admin/Tickets/Tickets";
import Inversiones from "./modules/Admin/Inversiones/Inversiones";

// Módulos del Prestamista
import DashboardPrestamista from "./modules/Prestamista/DashboardPrestamista/Dashboard";
import SeguimientoPrestamista from "./modules/Prestamista/SeguimientoPrestamista/Seguimiento";
import ProyectosPrestamista from "./modules/Prestamista/ProyectosPrestamista/Proyectos";

// Módulos del Prestatario
import DashboardPrestatario from "./modules/Prestatario/DashboardPrestatario/Dashboard";
import SeguimientoPrestatario from "./modules/Prestatario/SeguimientoPrestatario/Seguimiento";
import ProyectosPrestatario from "./modules/Prestatario/ProyectosPrestatario/Proyectos";

// Módulos del Soporte
import DashboardSoporte from "./modules/Soporte/DashboardSoporte/Dashboard";
import ProyectosSoporte from "./modules/Soporte/ProyectoSoporte/Proyecto";
import TicketsSoporte from "./modules/Soporte/TicketsSoporte/TicKets";

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    // Comentado para desarrollo
    // const token = localStorage.getItem("jwt_token");
    // const role = localStorage.getItem("userRole");

    // if (!token || isTokenExpired(token)) {
    //   localStorage.clear();
    //   setIsAuthenticated(false);
    //   navigate("/");
    // } else {
    setIsAuthenticated(true);
    const role = "Admin"; // Configuración temporal para pruebas
    const roleLinks = {
      Admin: [
        { to: "/admin/dashboard", label: "Dashboard" },
        { to: "/admin/usuarios", label: "Usuarios" },
        { to: "/admin/proyectos", label: "Proyectos" },
        { to: "/admin/tickets", label: "Tickets" },
        { to: "/admin/inversiones", label: "Inversiones" },
      ],
      Prestamista: [
        { to: "/prestamista/dashboard", label: "Dashboard" },
        { to: "/prestamista/seguimiento", label: "Seguimiento" },
        { to: "/prestamista/proyectos", label: "Proyectos" },
      ],
      Prestatario: [
        { to: "/prestatario/dashboard", label: "Dashboard" },
        { to: "/prestatario/seguimiento", label: "Seguimiento" },
        { to: "/prestatario/proyectos", label: "Proyectos" },
      ],
      Soporte: [
        { to: "/soporte/dashboard", label: "Dashboard" },
        { to: "/soporte/proyectos", label: "Proyectos" },
        { to: "/soporte/tickets", label: "Tickets" },
      ],
    };
    setLinks(roleLinks[role] || []);
    // }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />

      {isAuthenticated && (
        <Route
          path="/*"
          element={
            <>
              <Header />
              <Sidebar links={links} onLogout={handleLogout} />
            </>
          }
        />
      )}

      {/* Rutas del Administrador */}
      <Route path="/admin/dashboard" element={<AdminLayout><DashboardAdmin /></AdminLayout>} />
      <Route path="/admin/usuarios" element={<AdminLayout><Usuarios /></AdminLayout>} />
      <Route path="/admin/proyectos" element={<AdminLayout><ProyectosAdmin /></AdminLayout>} />
      <Route path="/admin/tickets" element={<AdminLayout><TicketsAdmin /></AdminLayout>} />
      <Route path="/admin/inversiones" element={<AdminLayout><Inversiones /></AdminLayout>} />

      {/* Rutas del Prestamista */}
      <Route path="/prestamista/dashboard" element={<PrestamistaLayout><DashboardPrestamista /></PrestamistaLayout>} />
      <Route path="/prestamista/seguimiento" element={<PrestamistaLayout><SeguimientoPrestamista /></PrestamistaLayout>} />
      <Route path="/prestamista/proyectos" element={<PrestamistaLayout><ProyectosPrestamista /></PrestamistaLayout>} />

      {/* Rutas del Prestatario */}
      <Route path="/prestatario/dashboard" element={<PrestatarioLayout><DashboardPrestatario /></PrestatarioLayout>} />
      <Route path="/prestatario/seguimiento" element={<PrestatarioLayout><SeguimientoPrestatario /></PrestatarioLayout>} />
      <Route path="/prestatario/proyectos" element={<PrestatarioLayout><ProyectosPrestatario /></PrestatarioLayout>} />

      {/* Rutas del Soporte */}
      <Route path="/soporte/dashboard" element={<SoporteLayout><DashboardSoporte /></SoporteLayout>} />
      <Route path="/soporte/proyectos" element={<SoporteLayout><ProyectosSoporte /></SoporteLayout>} />
      <Route path="/soporte/tickets" element={<SoporteLayout><TicketsSoporte /></SoporteLayout>} />

      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
