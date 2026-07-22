const express = require('express');
const router = express.Router();
const Cita = require('../models/Cita'); // Importamos el modelo ajustado a tu Figma
const { requireAuth } = require('../middleware/auth'); // Protege el listado completo de registros

// 1. POST: Crear una nueva cita (Paso 3 del modal en tu React)
router.post('/', async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    const citaGuardada = await nuevaCita.save();
    
    res.status(201).json({
      success: true,
      message: "Cita agendada con éxito.",
      data: citaGuardada
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error al registrar la cita médica.",
      error: error.message
    });
  }
});

// 2. GET: Buscar citas por correo electrónico o teléfono
router.get('/buscar/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const citas = await Cita.find({
      $or: [{ email: query }, { telefono: query }]
    }).sort({ createdAt: -1 });

    if (!citas || citas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron citas asociadas a esta búsqueda."
      });
    }
    res.status(200).json({ success: true, data: citas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al buscar.", error: error.message });
  }
});

// 3. GET: Buscar citas específicamente por teléfono
router.get('/telefono/:telefono', async (req, res) => {
  try {
    const citas = await Cita.find({ telefono: req.params.telefono }).sort({ createdAt: -1 });
    if (!citas || citas.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No se encontraron citas asociadas a este número de teléfono."
      });
    }
    res.status(200).json({ success: true, data: citas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error al buscar las citas.", error: error.message });
  }
});


// 4. GET: Traer citas (Protegido: requiere login)
// Admite query param ?doctor=NombreDelMedico para filtrar por profesional
router.get('/', requireAuth, async (req, res) => {
  try {
    const filter = {};
    if (req.query.doctor && req.query.doctor !== 'todos') {
      // Búsqueda flexible por nombre de doctor
      filter.doctor = { $regex: req.query.doctor, $options: 'i' };
    }
    const citas = await Cita.find(filter).sort({ fecha: 1, hora: 1 });
    res.status(200).json({
      success: true,
      data: citas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar las citas.",
      error: error.message
    });
  }
});

// 5. GET: Traer citas por nombre específico de médico
router.get('/medico/:doctor', requireAuth, async (req, res) => {
  try {
    const doctor = req.params.doctor;
    const filter = doctor === 'todos' ? {} : { doctor: { $regex: doctor, $options: 'i' } };
    const citas = await Cita.find(filter).sort({ fecha: 1, hora: 1 });
    res.status(200).json({
      success: true,
      data: citas
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error al recuperar las citas del médico.",
      error: error.message
    });
  }
});


module.exports = router; // Exportamos el router para server.js[cite: 2]