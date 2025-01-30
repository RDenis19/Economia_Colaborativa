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
export const fetchRoles = async () => {
    try {
        const response = await API.get('/roles');
        return response.data;
    } catch (error) {
        console.error('Error al obtener roles:', error);
        throw new Error('Error al obtener los roles.');
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



// Proyectos

// Obtener todos los proyectos
export const fetchProjects = async () => {
    try {
        const response = await API.get('/proyectos/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener proyectos:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Obtener un proyecto por ID
export const fetchProjectById = async (id) => {
    try {
        const response = await API.get(`/proyectos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el proyecto:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Crear un nuevo proyecto
export const createProject = async (projectData) => {
    try {
        const response = await API.post('/proyectos/', projectData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Editar un proyecto
export const updateProject = async (id, projectData) => {
    try {
        const response = await API.put(`/proyectos/${id}`, projectData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Eliminar un proyecto
export const deleteProject = async (id) => {
    try {
        const response = await API.delete(`/proyectos/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};


//proyecto_categoria

// Obtener todas las categorías de proyectos
export const fetchProjectCategories = async () => {
    try {
        const response = await API.get('/proyecto-categoria/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener categorías de proyectos:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Obtener una categoría de proyecto por ID
export const fetchProjectCategoryById = async (id) => {
    try {
        const response = await API.get(`/proyecto-categoria/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener la categoría del proyecto:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Crear una nueva categoría de proyecto
export const createProjectCategory = async (categoryData) => {
    try {
        const response = await API.post('/proyecto-categoria/', categoryData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la categoría del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Actualizar una categoría de proyecto
export const updateProjectCategory = async (id, categoryData) => {
    try {
        const response = await API.put(`/proyecto-categoria/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar la categoría del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Eliminar una categoría de proyecto
export const deleteProjectCategory = async (id) => {
    try {
        const response = await API.delete(`/proyecto-categoria/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar la categoría del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};



//proyecto_tipo

// Obtener todos los tipos de proyectos
export const fetchProjectTypes = async () => {
    try {
        const response = await API.get('/proyecto-tipo/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener tipos de proyectos:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Obtener un tipo de proyecto por ID
export const fetchProjectTypeById = async (id) => {
    try {
        const response = await API.get(`/proyecto-tipo/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener el tipo de proyecto:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Crear un nuevo tipo de proyecto
export const createProjectType = async (typeData) => {
    try {
        const response = await API.post('/proyecto-tipo/', typeData);
        return response.data;
    } catch (error) {
        console.error('Error al crear el tipo de proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Actualizar un tipo de proyecto
export const updateProjectType = async (id, typeData) => {
    try {
        const response = await API.put(`/proyecto-tipo/${id}`, typeData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el tipo de proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Eliminar un tipo de proyecto
export const deleteProjectType = async (id) => {
    try {
        const response = await API.delete(`/proyecto-tipo/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el tipo de proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};



//proyecto_verificacion

// Obtener todas las verificaciones de proyectos
export const fetchAllProjectVerifications = async () => {
    try {
        const response = await API.get('/proyecto-verificacion/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todas las verificaciones de proyectos:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Obtener la verificación de un proyecto por ID
export const fetchProjectVerification = async (projectId) => {
    try {
        const response = await API.get(`/proyecto-verificacion/${projectId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener verificación del proyecto:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

// Crear una nueva verificación para un proyecto
export const createProjectVerification = async (verificationData) => {
    try {
        const response = await API.post('/proyecto-verificacion/', verificationData);
        return response.data;
    } catch (error) {
        console.error('Error al crear la verificación del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Actualizar el estado de verificación de un proyecto
export const updateProjectVerification = async (id, verificationData) => {
    try {
        const response = await API.put(`/proyecto-verificacion/${id}`, verificationData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar verificación del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};

// Eliminar una verificación de proyecto
export const deleteProjectVerification = async (id) => {
    try {
        const response = await API.delete(`/proyecto-verificacion/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar verificación del proyecto:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};


//proyecto_verificacion_documentos

//Listar todos los verificacion_documentos
export const fetchAllProjectVerificationDocuments = async () => {
    try {
        const response = await API.get('/proyecto-verificacion-documentos/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener todos los documentos de verificación:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};

//Obtener documentos de verificación de un proyecto
export const fetchProjectVerificationDocuments = async (verificationId) => {
    try {
        const response = await API.get(`/proyecto-verificacion-documentos/${verificationId}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener documentos de verificación:', error);
        throw error.response ? error.response.data : { error: 'Error en el servidor' };
    }
};
//Subir un nuevo documento de verificación
export const uploadProjectVerificationDocument = async (documentData) => {
    try {
        const response = await API.post('/proyecto-verificacion-documentos/', documentData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error('Error al subir el documento de verificación:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};
//Eliminar un documento de verificación
export const deleteProjectVerificationDocument = async (documentId) => {
    try {
        const response = await API.delete(`/proyecto-verificacion-documentos/${documentId}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el documento de verificación:', error);
        throw error.response?.data || { mensaje: 'Error en el servidor' };
    }
};





export default API;



