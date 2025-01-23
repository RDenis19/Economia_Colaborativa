import axios from 'axios';
import { isTokenExpired } from './authUtils';

const API = axios.create({
    baseURL: 'http://localhost:3301',
    timeout: 10000,
});

API.interceptors.request.use(
    (config) => {
        if (!config.url.includes('/auth/login')) {
            const token = localStorage.getItem('jwt_token');
            if (token && !isTokenExpired(token)) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// login

export const loginRequest = async (credentials) => {
    try {
        const response = await API.post("/user/login", credentials, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        // Aquí manejamos el error para devolver un objeto con 'mensaje'
        const errorMessage = error.response && error.response.data && error.response.data.mensaje
            ? error.response.data.mensaje
            : "Error en el servidor. Intenta nuevamente.";

        // Lanzamos un objeto Error con el mensaje
        throw new Error(JSON.stringify({ mensaje: errorMessage }));
    }
};

// roles
export const fetchRoleById = async (id) => {
    try {
        const response = await API.get(`/rol/${id}`); // Llama a la ruta del rol
        return response.data;
    } catch (error) {
        console.error("Error al obtener el rol:", error);
        throw new Error("Error al obtener el rol. Intenta nuevamente.");
    }
};

// Usuarios

export const fetchUsers = async (page = 1, search = '') => {
    try {
        const response = await API.get(`/user/`, {
            params: {
                page,
                search,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

//  Registrar Usuario
export const registerUser = async (userData) => {
    try {
        const response = await API.post('/user/registro', userData);
        return response.data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// visualizar Perfil de un Usuario
export const fetchUserById = async (id) => {
    try {
        const response = await API.get(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Eliminar Usuario
export const deleteUserById = async (id) => {
    try {
        const response = await API.delete(`/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Actualizar usuario
export const updateUserById = async (id, userData) => {
    try {
        const response = await API.put(`/user/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Rol

// Actualizar un rol
export const updateRoleById = async (id, roleData) => {
    try {
        const response = await API.put(`/rol/${id}`, roleData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar rol:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Proyectos
export const fetchProjects = async () => {
    try {
        const response = await API.get(`/projects`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

// Tickets
export const fetchTickets = async () => {
    try {
        const response = await API.get(`/tickets`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener tickets:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

//Inversiones
export const fetchInvestments = async () => {
    try {
        const response = await API.get(`/investments`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener inversiones:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};


export default API;