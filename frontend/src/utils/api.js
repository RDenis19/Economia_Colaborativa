import axios from 'axios';
import { isTokenExpired } from './authUtils';

const API = axios.create({
    baseURL: 'http://localhost:3301',
    timeout: 10000,
});

API.interceptors.request.use(
    (config) => {
        if (!config.url.includes('/auth/')) {
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
// Función para login
export const loginRequest = async (credenciales) => {
    try {
        // Crear credenciales con la contraseña encriptada
        const encryptedCredenciales = {
            correo: credenciales.correo,
            contraseña: credenciales.contraseña,
        };

        const response = await API.post("/auth/login", encryptedCredenciales, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Login exitoso:", response.data);
        return response.data; // Devuelve el token y otros datos relevantes
    } catch (error) {
        console.error("Error en login:", error);
        const errorMessage =
            error.response?.data?.mensaje || "Error en el servidor. Intenta nuevamente.";
        throw new Error(JSON.stringify({ mensaje: errorMessage }));
    }
};


// roles
export const fetchRoleById = async (id) => {
    try {
        const response = await API.get(`/roles/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al obtener el rol:", error);
        throw new Error("Error al obtener el rol. Intenta nuevamente.");
    }
};

// Usuarios

export const fetchUsers = async () => {
    try {
        const response = await API.get('/usuarios/'); 
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

export const createUser = async (userData) => {
    try {
        const response = await API.post('/usuarios/', userData);
        return response.data;
    } catch (error) {
        console.error('Error en createUser:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear el usuario.');
    }
};

// Asignar Rol
export const assignUserRole = async (roleData) => {
    try {
        const response = await API.post('/usuario_roles/', roleData);
        return response.data;
    } catch (error) {
        console.error('Error en assignUserRole:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al asignar rol.');
    }
};

// Información Personal
export const createUserPersonalInfo = async (personalInfo) => {
    try {
        const response = await API.post('/informacion-personal/', personalInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserPersonalInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear información personal.');
    }
};

// Información de Contacto
export const createUserContactInfo = async (contactInfo) => {
    try {
        const response = await API.post('/informacion-contacto/', contactInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserContactInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear información de contacto.');
    }
};

// Información Académica
export const createUserAcademicInfo = async (academicInfo) => {
    try {
        const response = await API.post('/informacion-academica/', academicInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserAcademicInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear información académica.');
    }
};

// Información Financiera
export const createUserFinancialInfo = async (financialInfo) => {
    try {
        const response = await API.post('/informacion-financiera/', financialInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserFinancialInfo:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear información financiera.');
    }
};

// Verificación de Usuario
export const createUserVerification = async (verificationInfo) => {
    try {
        const response = await API.post('/usuario-verificacion/', verificationInfo);
        return response.data;
    } catch (error) {
        console.error('Error en createUserVerification:', error.response?.data || error.message);
        throw new Error(error.response?.data?.mensaje || 'Error al crear la verificación del usuario.');
    }
};



// Asegurar que los endpoints usen `/usuarios/` en vez de `/user/`
export const fetchUserById = async (id) => {
    try {
        const response = await API.get(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener usuario por ID:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

export const deleteUserById = async (id) => {
    try {
        const response = await API.delete(`/usuarios/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

export const updateUserById = async (id, userData) => {
    try {
        const response = await API.put(`/usuarios/${id}`, userData);
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
        const response = await API.get('/proyectos/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Tickets
// Obtener todos los tickets
export const fetchTickets = async () => {
    try {
        const response = await API.get('/tickets');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los tickets:', error);
        throw new Error('No se pudieron obtener los tickets.');
    }
};

// Obtener un ticket por ID
export const fetchTicketById = async (id) => {
    try {
        const response = await API.get(`/tickets/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error al obtener el ticket ${id}:`, error);
        throw new Error('No se pudo obtener el ticket.');
    }
};

// Crear un nuevo ticket
export const createTicket = async (ticketData) => {
    try {
        const response = await API.post('/tickets', ticketData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error('Error al crear el ticket:', error);
        throw new Error('No se pudo crear el ticket.');
    }
};

// Actualizar un ticket existente
export const updateTicket = async (id, ticketData) => {
    try {
        const response = await API.put(`/tickets/${id}`, ticketData, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;
    } catch (error) {
        console.error(`Error al actualizar el ticket ${id}:`, error);
        throw new Error('No se pudo actualizar el ticket.');
    }
};

// Eliminar un ticket
export const deleteTicketById = async (id) => {
    try {
        await API.delete(`/tickets/${id}`);
        return { mensaje: 'Ticket eliminado exitosamente.' };
    } catch (error) {
        console.error(`Error al eliminar el ticket ${id}:`, error);
        throw new Error('No se pudo eliminar el ticket.');
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



