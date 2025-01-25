import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login/Login";
import MainView from "./views/MainView"; // Importa MainView correctamente
import { AuthContext } from "./auth/AuthContext";

const App = () => {
  const { roles } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      {roles.length > 0 ? (
        <Route path="/*" element={<MainView />} />
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
};

export default App;
