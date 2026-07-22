require('dotenv').config();
const express = require('express');
const dns = require('dns');
const cors = require('cors');
const conectarDB = require('./config/db');
const citasRoutes = require('./routes/citas'); // <-- 1. IMPORTAR LAS RUTAS
const authRoutes = require('./routes/auth'); // <-- Rutas de login para el panel de registros

const app = express();

// Force Node DNS resolver to use Google DNS to avoid local DNS SRV failures
dns.setServers(['8.8.8.8']);
console.log('DNS servers set to:', dns.getServers());

conectarDB();

app.use(cors());
app.use(express.json());

// 2. MONTAR LAS RUTAS EN EL PREFIJO CORRECTO
app.use('/api/citas', citasRoutes); 
app.use('/api/auth', authRoutes); // <-- Rutas de login del panel de registros

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Servidor levantado correctamente",
    context: "Clinica Salud Plena Service Design"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`[Servidor Activo] Corriendo en el puerto: ${PORT}`);
});