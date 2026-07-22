const mongoose = require('mongoose');

const CitaSchema = new mongoose.Schema({
  nombrePaciente: { type: String, required: true }, // "Nombre completo" en tu Figma
  email: { type: String, required: true },          // "Correo electrónico"
  telefono: { type: String, required: true },       // "Teléfono"
  motivo: { type: String, required: true },         // "Motivo de consulta"
  doctor: { type: String, required: true },         // E.g., "Dr. Carlos Mendoza"
  especialidad: { type: String, required: true },   // E.g., "Cardiología"
  fecha: { type: String, required: true },          // Fecha seleccionada
  hora: { type: String, required: true },           // Hora seleccionada (e.g., "08:30")
  estado: { type: String, default: 'Pendiente' },   // Flujo interno para la clínica
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Cita', CitaSchema);