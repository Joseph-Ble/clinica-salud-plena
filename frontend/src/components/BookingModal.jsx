import React, { useState } from 'react';
import axios from 'axios';

function BookingModal({ step, setStep, selectedDoctor, setSelectedDoctor, onClose }) {
  // Lista de doctores de apoyo para el Paso 1 (si inicia genérico)
  const doctoresSoporte = [
    { nombre: "Dra. Elena Romero", especialidad: "Medicina General" },
    { nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología" },
    { nombre: "Dra. Sofía Vargas", especialidad: "Pediatría" },
    { nombre: "Dr. Andrés Torres", especialidad: "Traumatología" }
  ];

  // Datos de la cita
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [fechaErr, setFechaErr] = useState('');

  // Paso 3 Form
  const [nombrePaciente, setNombrePaciente] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [motivo, setMotivo] = useState('');

  // Estado de campos tocados (touched) para mostrar errores en blur / interactivos
  const [touched, setTouched] = useState({
    nombrePaciente: false,
    email: false,
    telefono: false,
    motivo: false
  });

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Validaciones del Paso 3
  const validateNombre = (val) => {
    const trimmed = val.trim();
    if (!trimmed || trimmed.length < 3) {
      return "Ingrese un nombre válido.";
    }
    // Solo letras, espacios y caracteres acentuados
    const nombreRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑüÜ\s]+$/;
    if (!nombreRegex.test(trimmed)) {
      return "Ingrese un nombre válido.";
    }
    return "";
  };

  const validateEmail = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return "Ingrese un correo electrónico válido.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return "Ingrese un correo electrónico válido.";
    }
    return "";
  };

  const validateTelefono = (val) => {
    const digitsOnly = val.replace(/\D/g, '');
    if (!digitsOnly || digitsOnly.length < 9) {
      return "Ingrese un número de teléfono válido de 9 dígitos.";
    }
    return "";
  };

  const validateMotivo = (val) => {
    const trimmed = val.trim();
    if (!trimmed || trimmed.length < 10) {
      return "Describa brevemente el motivo de la consulta.";
    }
    return "";
  };

  const errNombre = validateNombre(nombrePaciente);
  const errEmail = validateEmail(email);
  const errTelefono = validateTelefono(telefono);
  const errMotivo = validateMotivo(motivo);

  const isStep3Valid = !errNombre && !errEmail && !errTelefono && !errMotivo;

  // Horas disponibles
  const horasDisponibles = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"];

  // Auxiliar: obtener la fecha de hoy en formato YYYY-MM-DD según el sistema
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayString();
  const esHoy = fecha === todayStr;

  // Convertir string "HH:MM" a minutos para comparaciones precisas de hora
  const parseTimeToMinutes = (timeStr) => {
    if (!timeStr) return 0;
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const getCurrentTimeMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // Determinar si un horario específico ya transcurrió en el día de hoy
  const esHoraPasada = (hStr) => {
    if (!esHoy) return false;
    return parseTimeToMinutes(hStr) <= getCurrentTimeMinutes();
  };

  // Manejar el cambio de fecha con validación dinámica
  const handleFechaChange = (e) => {
    const val = e.target.value;
    if (val && val < todayStr) {
      setFechaErr('No se pueden seleccionar fechas pasadas. Por favor, elige hoy o una fecha futura.');
      setFecha('');
      setHora('');
    } else {
      setFechaErr('');
      setFecha(val);
      // Si la hora ya seleccionada es pasada para hoy, limpiarla
      if (val === todayStr && hora && parseTimeToMinutes(hora) <= getCurrentTimeMinutes()) {
        setHora('');
      }
    }
  };

  // Verificar si todos los horarios de hoy ya expiraron
  const todosHorariosExpiradosHoy = esHoy && horasDisponibles.every(esHoraPasada);

  // Guardar en Base de Datos (Mandar al Backend)
  const handleSubmit = async () => {
    if (!isStep3Valid) return;

    const nuevaCita = {
      nombrePaciente: nombrePaciente.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      motivo: motivo.trim(),
      doctor: selectedDoctor?.nombre || "No especificado",
      especialidad: selectedDoctor?.especialidad || "Medicina General",
      fecha,
      hora
    };

    try {
      const res = await axios.post('https://clinica-backend-mkc1.onrender.com/api/citas', nuevaCita);
      if (res.data.success) {
        setStep(4);
      }
    } catch (error) {
      console.error("Detalle completo del error:", error);

      if (error.response) {
        alert(`Error del Backend: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        alert("No se recibió respuesta del servidor. Revisa si hay problemas de conexión.");
      } else {
        alert(`Error de configuración: ${error.message}`);
      }
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '520px' }}>
        <div className="modal-content border-0 p-4" style={{ backgroundColor: '#FCFAF6', borderRadius: '24px' }}>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            {step < 4 ? (
              <span className="text-uppercase fw-bold text-muted small" style={{ letterSpacing: '1px' }}>
                Paso {step} de 3
              </span>
            ) : (
              <span className="text-uppercase fw-bold text-success small">Reserva Realizada</span>
            )}
            <button type="button" className="btn-close" onClick={onClose} style={{ boxShadow: 'none' }}></button>
          </div>

          {/* PASO 1: Elegir Médico si no se seleccionó en las cartas */}
          {step === 1 && (
            <div>
              <h2 className="fw-bold mb-4" style={{ color: '#084E4C' }}>Selecciona tu médico</h2>
              <div className="list-group">
                {doctoresSoporte.map((doc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="list-group-item list-group-item-action py-3 border-0 mb-2 d-flex justify-content-between align-items-center"
                    style={{ backgroundColor: '#F7F4EE', borderRadius: '12px', color: '#084E4C', fontWeight: '600' }}
                    onClick={() => {
                      setSelectedDoctor(doc);
                      setStep(2);
                    }}
                  >
                    <span>{doc.nombre} <small className="text-muted d-block fw-normal">{doc.especialidad}</small></span>
                    <i className="bi bi-chevron-right"></i>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PASO 2: Seleccionar Fecha y Hora */}
          {step === 2 && (
            <div>
              <h2 className="fw-bold mb-3" style={{ color: '#084E4C' }}>Selecciona fecha y hora</h2>

              {/* Doctor Card */}
              <div className="p-3 mb-4 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#D2EBE7', borderRadius: '15px' }}>
                <div>
                  <h6 className="fw-bold mb-0" style={{ color: '#084E4C' }}>{selectedDoctor?.nombre}</h6>
                  <span className="text-muted small">{selectedDoctor?.especialidad}</span>
                </div>
                <button className="btn btn-link text-decoration-underline p-0 fw-bold" style={{ color: '#084E4C' }} onClick={() => setStep(1)}>
                  Cambiar
                </button>
              </div>

              {/* Fecha con restricción min={todayStr} */}
              <label className="fw-bold mb-2" style={{ color: '#084E4C' }}>Fecha de la consulta</label>
              <input
                type="date"
                className="form-control py-3 border-0 mb-2"
                style={{ borderRadius: '12px', backgroundColor: '#F7F4EE' }}
                min={todayStr}
                value={fecha}
                onChange={handleFechaChange}
              />

              {/* Error de fecha si intentan fecha inválida */}
              {fechaErr && (
                <div className="alert alert-warning py-2 small mb-3 rounded-3 d-flex align-items-center gap-2" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{fechaErr}</span>
                </div>
              )}

              {/* Advertencia si no quedan turnos disponibles hoy */}
              {todosHorariosExpiradosHoy && (
                <div className="alert alert-info py-2 small mb-3 rounded-3 d-flex align-items-center gap-2" role="alert">
                  <i className="bi bi-info-circle-fill"></i>
                  <span>No hay más horarios disponibles para hoy. Por favor, selecciona una fecha futura.</span>
                </div>
              )}

              {/* Grid de Horarios */}
              <label className="fw-bold mb-2" style={{ color: '#084E4C' }}>Horario disponible</label>
              <div className="row g-2 mb-4">
                {horasDisponibles.map((h, idx) => {
                  const pasada = esHoraPasada(h);
                  const selected = hora === h;
                  return (
                    <div className="col-3" key={idx}>
                      <button
                        type="button"
                        className="btn w-100 py-2 border-0 fw-semibold"
                        style={{
                          borderRadius: '10px',
                          fontSize: '0.85rem',
                          backgroundColor: selected ? '#084E4C' : pasada ? '#EAEAEA' : '#F7F4EE',
                          color: selected ? '#FCFAF6' : pasada ? '#9E9E9E' : '#084E4C',
                          cursor: pasada ? 'not-allowed' : 'pointer',
                          textDecoration: pasada ? 'line-through' : 'none'
                        }}
                        disabled={pasada}
                        onClick={() => !pasada && setHora(h)}
                        title={pasada ? "Este horario ya ha transcurrido" : `Seleccionar ${h}`}
                      >
                        {h}
                      </button>
                    </div>
                  );
                })}
              </div>

              <button
                className="btn w-100 py-3 text-white fw-bold"
                style={{ backgroundColor: '#084E4C', borderRadius: '12px' }}
                disabled={!fecha || !hora || (esHoy && parseTimeToMinutes(hora) <= getCurrentTimeMinutes())}
                onClick={() => setStep(3)}
              >
                Continuar →
              </button>
            </div>
          )}

          {/* PASO 3: Formulario Final de Contacto */}
          {step === 3 && (
            <div>
              <h2 className="fw-bold mb-3" style={{ color: '#084E4C' }}>Tus datos de contacto</h2>

              {/* Resumen */}
              <div className="p-3 mb-4" style={{ backgroundColor: '#D2EBE7', borderRadius: '15px' }}>
                <span className="text-muted small">Reserva para:</span>
                <p className="mb-0 fw-bold" style={{ color: '#084E4C' }}>
                  {selectedDoctor?.nombre} · {fecha} a las {hora}
                </p>
              </div>

              {/* Nombre completo */}
              <div className="mb-3">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Nombre completo</label>
                <input
                  type="text"
                  className="form-control py-2"
                  style={{
                    backgroundColor: '#F7F4EE',
                    borderRadius: '10px',
                    border: (touched.nombrePaciente && errNombre) ? '1.5px solid #dc3545' : '1.5px solid transparent'
                  }}
                  placeholder="María García López"
                  value={nombrePaciente}
                  onChange={(e) => setNombrePaciente(e.target.value)}
                  onBlur={() => handleBlur('nombrePaciente')}
                />
                {touched.nombrePaciente && errNombre && (
                  <small className="text-danger mt-1 d-block fw-semibold" style={{ fontSize: '0.8rem' }}>
                    {errNombre}
                  </small>
                )}
              </div>

              {/* Correo electrónico */}
              <div className="mb-3">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Correo electrónico</label>
                <input
                  type="email"
                  className="form-control py-2"
                  style={{
                    backgroundColor: '#F7F4EE',
                    borderRadius: '10px',
                    border: (touched.email && errEmail) ? '1.5px solid #dc3545' : '1.5px solid transparent'
                  }}
                  placeholder="maria@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => handleBlur('email')}
                />
                {touched.email && errEmail && (
                  <small className="text-danger mt-1 d-block fw-semibold" style={{ fontSize: '0.8rem' }}>
                    {errEmail}
                  </small>
                )}
              </div>

              {/* Teléfono */}
              <div className="mb-3">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Teléfono</label>
                <input
                  type="tel"
                  maxLength={9}
                  className="form-control py-2"
                  style={{
                    backgroundColor: '#F7F4EE',
                    borderRadius: '10px',
                    border: (touched.telefono && errTelefono) ? '1.5px solid #dc3545' : '1.5px solid transparent'
                  }}
                  placeholder="912345678"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value.replace(/\D/g, '').slice(0, 9))}
                  onBlur={() => handleBlur('telefono')}
                />
                {touched.telefono && errTelefono && (
                  <small className="text-danger mt-1 d-block fw-semibold" style={{ fontSize: '0.8rem' }}>
                    {errTelefono}
                  </small>
                )}
              </div>

              {/* Motivo de consulta */}
              <div className="mb-4">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Motivo de consulta</label>
                <textarea
                  className="form-control py-2"
                  rows="3"
                  maxLength={300}
                  style={{
                    backgroundColor: '#F7F4EE',
                    borderRadius: '10px',
                    border: (touched.motivo && errMotivo) ? '1.5px solid #dc3545' : '1.5px solid transparent'
                  }}
                  placeholder="Describe brevemente el motivo de tu consulta médica..."
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  onBlur={() => handleBlur('motivo')}
                ></textarea>
                {touched.motivo && errMotivo && (
                  <small className="text-danger mt-1 d-block fw-semibold" style={{ fontSize: '0.8rem' }}>
                    {errMotivo}
                  </small>
                )}
              </div>

              <button
                className="btn w-100 py-3 text-white fw-bold"
                style={{ backgroundColor: '#084E4C', borderRadius: '12px' }}
                disabled={!isStep3Valid}
                onClick={handleSubmit}
              >
                Confirmar cita
              </button>
            </div>
          )}

          {/* PASO 4: Confirmación Exitosa */}
          {step === 4 && (
            <div className="text-center py-4">
              <div className="d-flex align-items-center justify-content-center mx-auto mb-4"
                style={{ width: '80px', height: '80px', backgroundColor: '#D2EBE7', borderRadius: '50%' }}>
                <i className="bi bi-check-lg fs-1" style={{ color: '#084E4C' }}></i>
              </div>
              <h2 className="fw-bold mb-2" style={{ color: '#084E4C' }}>¡Cita confirmada!</h2>
              <p className="text-muted mb-4 px-3">
                Tu cita con <strong style={{ color: '#084E4C' }}>{selectedDoctor?.nombre}</strong> ha sido reservada para el <strong style={{ color: '#084E4C' }}>{fecha}</strong> a las <strong style={{ color: '#084E4C' }}>{hora}</strong>. <br />
                Recibirás una confirmación en <strong style={{ color: '#084E4C' }}>{email}</strong>.
              </p>

              {/* Recomendaciones */}
              <div className="p-4 mb-4 text-start" style={{ backgroundColor: '#D2EBE7', borderRadius: '15px' }}>
                <span className="fw-bold text-uppercase d-block mb-2" style={{ color: '#084E4C', fontSize: '0.8rem' }}>RECUERDA</span>
                <ul className="mb-0 ps-3 small" style={{ color: '#084E4C' }}>
                  <li>Llegar 10 minutos antes de tu cita.</li>
                  <li>Traer tu documento de identidad.</li>
                  <li>Informar si necesitas cancelar con 24h de antelación.</li>
                </ul>
              </div>

              <button className="btn w-100 py-3 text-white fw-bold" style={{ backgroundColor: '#084E4C', borderRadius: '12px' }} onClick={onClose}>
                Entendido
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default BookingModal;