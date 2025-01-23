import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("jwt_token");
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (err) {
    console.error("Error decoding token:", err);
    return true;
  }
};

export const checkTokenAndRedirect = (navigate, redirectPath = "/") => {
  const token = localStorage.getItem("jwt_token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp > currentTime) {
      navigate(redirectPath); // Redirige si el token es válido
      return true;
    }
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return false;
  }
  return false;
};
