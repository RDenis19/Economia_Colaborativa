const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = requireS('./routes/auth.routes.js')

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

//Rutas
app.use('/auth',authRoutes)

const PORT = process.env.PORT || 3301;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});