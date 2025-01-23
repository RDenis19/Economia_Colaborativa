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
        const response = await API.post('/auth/login', credentials);
        return response.data;
    } catch (error) {
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

// Usuarios

export const fetchUsers = async () => {
    try {
        const response = await API.get(`/users`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error.response
            ? error.response.data
            : { error: 'Error en el servidor' };
    }
};

export default API;

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

