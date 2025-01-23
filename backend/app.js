const express = require('express');
const cors = require('cors');
require('dotenv').config();

const categoriaRoutes = require('./routes/categoria.routes');
const rolRoutes = require('./routes/rol.routes');
const tipoCrowdfundingRoutes = require('./routes/tipoCrowdfunding.routes');
const userRoutes = require('./routes/usuario.routes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

//Rutas
app.use('/categoria', categoriaRoutes);
app.use('/rol', rolRoutes);
app.use('/tipoCrowdfunding', tipoCrowdfundingRoutes);
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});