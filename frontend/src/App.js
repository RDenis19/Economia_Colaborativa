import React, { useEffect, useState } from "react";
import { useNavigate, Routes, Route, Navigate } from "react-router-dom";
import { getToken, isTokenExpired } from "./utils/authUtils";

// Componentes generales
import Login from "./modules/Login/Login";
import Header from "./components/layouts/Header";
import Sidebar from "./components/layouts/Sidebar";

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

// Layout Autenticado
const AuthenticatedLayout = ({ children, links, onLogout }) => (
  <>
    <Header username="Usuario" profilePic="" />
    <Sidebar links={links} onLogout={onLogout} />
    <div style={{ padding: "20px" }}>{children}</div>
  </>
);

function App() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [links, setLinks] = useState([]);

  // Verificar autenticación y rol al cargar la app
  useEffect(() => {
    const token = getToken();
    const userRole = localStorage.getItem("userRole");

    if (!token || isTokenExpired(token)) {
      localStorage.clear();
      setIsAuthenticated(false);
      setRole("");
      navigate("/");
    } else {
      setIsAuthenticated(true);
      setRole(userRole);

      const roleLinks = {
        Administrador: [
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

      setLinks(roleLinks[userRole] || []);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setRole("");
    navigate("/");
  };

  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/" element={<Login />} />

      {/* Rutas protegidas */}
      {isAuthenticated && role === "Administrador" && (
        <Route
          path="/admin/*"
          element={
            <AuthenticatedLayout links={links} onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardAdmin />} />
                <Route path="usuarios" element={<Usuarios />} />
                <Route path="proyectos" element={<ProyectosAdmin />} />
                <Route path="tickets" element={<TicketsAdmin />} />
                <Route path="inversiones" element={<Inversiones />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      )}

      {isAuthenticated && role === "Prestamista" && (
        <Route
          path="/prestamista/*"
          element={
            <AuthenticatedLayout links={links} onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardPrestamista />} />
                <Route path="seguimiento" element={<SeguimientoPrestamista />} />
                <Route path="proyectos" element={<ProyectosPrestamista />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      )}

      {isAuthenticated && role === "Prestatario" && (
        <Route
          path="/prestatario/*"
          element={
            <AuthenticatedLayout links={links} onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardPrestatario />} />
                <Route path="seguimiento" element={<SeguimientoPrestatario />} />
                <Route path="proyectos" element={<ProyectosPrestatario />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      )}

      {isAuthenticated && role === "Soporte" && (
        <Route
          path="/soporte/*"
          element={
            <AuthenticatedLayout links={links} onLogout={handleLogout}>
              <Routes>
                <Route path="dashboard" element={<DashboardSoporte />} />
                <Route path="proyectos" element={<ProyectosSoporte />} />
                <Route path="tickets" element={<TicketsSoporte />} />
              </Routes>
            </AuthenticatedLayout>
          }
        />
      )}

      {/* Redirección para roles no reconocidos */}
      {!isAuthenticated && <Route path="*" element={<Navigate to="/" />} />}

      {/* Página 404 */}
      <Route path="*" element={<h1>404 - Página no encontrada</h1>} />
    </Routes>
  );
}

export default App;
