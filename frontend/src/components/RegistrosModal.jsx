import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegistrosModal({ onClose }) {
  const [token, setToken] = useState(sessionStorage.getItem('csp_admin_token') || '');
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');
  const [cargandoLogin, setCargandoLogin] = useState(false);

  // Estado para el médico seleccionado
  const [selectedDoctor, setSelectedDoctor] = useState(sessionStorage.getItem('csp_selected_doctor') || '');
  const [citas, setCitas] = useState([]);
  const [cargandoCitas, setCargandoCitas] = useState(false);
  const [errorCitas, setErrorCitas] = useState('');

  // Lista oficial de médicos de la clínica
  const listaDoctores = [
    { nombre: "Dra. Elena Romero", especialidad: "Medicina General", icono: "bi-person-badge-fill" },
    { nombre: "Dr. Carlos Mendoza", especialidad: "Cardiología", icono: "bi-heart-pulse-fill" },
    { nombre: "Dra. Sofía Vargas", especialidad: "Pediatría", icono: "bi-emoji-smile-fill" },
    { nombre: "Dr. Andrés Torres", especialidad: "Traumatología", icono: "bi-activity" }
  ];

  // 1. Iniciar sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorLogin('');
    setCargandoLogin(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { usuario, clave });
      if (res.data.success) {
        setToken(res.data.token);
        sessionStorage.setItem('csp_admin_token', res.data.token);
        // Al autenticarse, no cargamos automáticamente la tabla general.
        // Se requerirá seleccionar el médico en el paso 2 (o usar la selección previa).
      }
    } catch (error) {
      setErrorLogin(error.response?.data?.message || 'No se pudo iniciar sesión.');
    } finally {
      setCargandoLogin(false);
    }
  };

  // 2. Cargar citas desde el backend filtrando por el médico seleccionado
  const cargarCitasPorMedico = async (tokenActivo, doctorNombre) => {
    if (!doctorNombre) return;
    setErrorCitas('');
    setCargandoCitas(true);
    try {
      // Consumir el endpoint backend con filtro de médico por query param
      const url = doctorNombre === 'todos' 
        ? 'http://localhost:5000/api/citas'
        : `http://localhost:5000/api/citas?doctor=${encodeURIComponent(doctorNombre)}`;

      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${tokenActivo}` }
      });

      if (res.data.success) {
        setCitas(res.data.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('csp_admin_token');
        sessionStorage.removeItem('csp_selected_doctor');
        setToken('');
        setSelectedDoctor('');
        setErrorCitas('Tu sesión expiró. Inicia sesión de nuevo.');
      } else {
        setErrorCitas(error.response?.data?.message || 'No se pudieron cargar los registros de citas.');
      }
    } finally {
      setCargandoCitas(false);
    }
  };

  // Efecto para cargar citas cuando cambie el token o el doctor seleccionado
  useEffect(() => {
    if (token && selectedDoctor) {
      cargarCitasPorMedico(token, selectedDoctor);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, selectedDoctor]);

  // Cambiar médico seleccionado
  const handleSeleccionarDoctor = (docNombre) => {
    setSelectedDoctor(docNombre);
    sessionStorage.setItem('csp_selected_doctor', docNombre);
  };

  // Cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem('csp_admin_token');
    sessionStorage.removeItem('csp_selected_doctor');
    setToken('');
    setSelectedDoctor('');
    setCitas([]);
  };

  return (
    <div 
      className="modal show d-block" 
      tabIndex="-1" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.45)', 
        backdropFilter: 'blur(4px)',
        animation: 'fadeIn 0.25s ease-in-out'
      }}
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div 
          className="modal-content border-0 p-4 shadow-lg" 
          style={{ 
            backgroundColor: '#FCFAF6', 
            borderRadius: '24px',
            animation: 'slideUp 0.25s ease-in-out'
          }}
        >

          {/* Header principal del Modal */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <div 
                className="d-flex align-items-center justify-content-center text-white" 
                style={{ width: '38px', height: '38px', backgroundColor: '#084E4C', borderRadius: '10px' }}
              >
                <i className="bi bi-lock-fill fs-5"></i>
              </div>
              <h3 className="fw-bold mb-0" style={{ color: '#084E4C' }}>Registros de Citas</h3>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} 
              style={{ boxShadow: 'none' }}
              aria-label="Cerrar"
            ></button>
          </div>

          {/* PASO 1: Formulario de Login (Si no está autenticado) */}
          {!token ? (
            <form onSubmit={handleLogin} className="py-2">
              <p className="text-muted mb-4">
                Esta sección es solo para el personal de la clínica. Inicia sesión para acceder a los registros médicos.
              </p>

              {errorLogin && (
                <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{errorLogin}</span>
                </div>
              )}

              <div className="mb-3">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Usuario</label>
                <div className="position-relative">
                  <i className="bi bi-person position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  <input
                    type="text"
                    className="form-control py-2 ps-5 border-0"
                    style={{ backgroundColor: '#F7F4EE', borderRadius: '10px', color: '#2F3E46' }}
                    value={usuario}
                    onChange={(e) => setUsuario(e.target.value)}
                    placeholder="Ingrese su usuario"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="fw-semibold mb-1" style={{ color: '#084E4C' }}>Clave</label>
                <div className="position-relative">
                  <i className="bi bi-key position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
                  <input
                    type="password"
                    className="form-control py-2 ps-5 border-0"
                    style={{ backgroundColor: '#F7F4EE', borderRadius: '10px', color: '#2F3E46' }}
                    value={clave}
                    onChange={(e) => setClave(e.target.value)}
                    placeholder="Ingrese su clave"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                style={{ backgroundColor: '#084E4C', borderRadius: '12px' }}
                disabled={cargandoLogin}
              >
                {cargandoLogin ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>Ingresando...</span>
                  </>
                ) : (
                  <>
                    <i className="bi bi-box-arrow-in-right"></i>
                    <span>Iniciar sesión</span>
                  </>
                )}
              </button>
            </form>
          ) : !selectedDoctor ? (
            /* PASO 2: Selección de Médico (Post-Login) */
            <div className="py-2">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                  <h5 className="fw-bold mb-1" style={{ color: '#084E4C' }}>
                    <i className="bi bi-person-bounding-box me-2"></i>
                    Seleccione su perfil médico
                  </h5>
                  <p className="text-muted small mb-0">
                    Elija el profesional médico para acceder únicamente a sus pacientes asignados.
                  </p>
                </div>
                <button 
                  className="btn btn-sm btn-outline-secondary rounded-pill px-3"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-left me-1"></i>
                  Cerrar sesión
                </button>
              </div>

              {/* Grid de Selección de Médicos */}
              <div className="row g-3 mb-4">
                {listaDoctores.map((doc, index) => (
                  <div className="col-12 col-md-6" key={index}>
                    <div 
                      className="card border-0 p-3 shadow-sm h-100 cursor-pointer text-start position-relative"
                      style={{ 
                        backgroundColor: '#FFFFFF', 
                        borderRadius: '16px',
                        border: '2px solid #E5E4E7',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => handleSeleccionarDoctor(doc.nombre)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = '#084E4C';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = '#E5E4E7';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="d-flex align-items-center justify-content-center text-white flex-shrink-0"
                          style={{ width: '48px', height: '48px', backgroundColor: '#084E4C', borderRadius: '12px' }}
                        >
                          <i className={`bi ${doc.icono} fs-4`}></i>
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-0" style={{ color: '#084E4C' }}>{doc.nombre}</h6>
                          <span className="text-muted small">{doc.especialidad}</span>
                        </div>
                        <i className="bi bi-chevron-right text-muted fs-5"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Opción adicional: Ver todas las citas */}
              <div className="text-center pt-2 border-top">
                <button
                  className="btn btn-link text-decoration-none fw-semibold small"
                  style={{ color: '#084E4C' }}
                  onClick={() => handleSeleccionarDoctor('todos')}
                >
                  <i className="bi bi-people-fill me-1"></i>
                  Ver vista general de todos los médicos
                </button>
              </div>
            </div>
          ) : (
            /* PASO 3: Tabla de Citas del Médico Seleccionado */
            <div>
              {/* Barra de Filtro y Control de Médico Superior */}
              <div className="p-3 mb-3 rounded-3 d-flex flex-wrap align-items-center justify-content-between gap-3" style={{ backgroundColor: '#F7F4EE', borderRadius: '14px' }}>
                <div className="d-flex align-items-center gap-2">
                  <span className="badge px-3 py-2 rounded-pill fw-semibold d-flex align-items-center gap-2" style={{ backgroundColor: '#084E4C', color: '#FFFFFF', fontSize: '0.85rem' }}>
                    <i className="bi bi-person-check-fill"></i>
                    {selectedDoctor === 'todos' ? 'Todos los médicos' : selectedDoctor}
                  </span>
                  <span className="text-muted small">
                    {selectedDoctor === 'todos' 
                      ? 'Mostrando la totalidad de citas de la clínica.' 
                      : `Mostrando únicamente los pacientes de ${selectedDoctor}.`}
                  </span>
                </div>

                <div className="d-flex align-items-center gap-2 ms-auto">
                  {/* Selector rápido "Mis Pacientes / Cambiar Médico" */}
                  <div className="d-flex align-items-center gap-1">
                    <i className="bi bi-search text-muted small"></i>
                    <select
                      className="form-select form-select-sm border-0 py-1 ps-2 pe-4 fw-semibold"
                      style={{ backgroundColor: '#FFFFFF', borderRadius: '8px', color: '#084E4C', cursor: 'pointer' }}
                      value={selectedDoctor}
                      onChange={(e) => handleSeleccionarDoctor(e.target.value)}
                      aria-label="Filtrar por médico"
                    >
                      <option value="" disabled>-- Cambiar médico --</option>
                      {listaDoctores.map((doc, idx) => (
                        <option key={idx} value={doc.nombre}>
                          👨‍⚕️ {doc.nombre} ({doc.especialidad})
                        </option>
                      ))}
                      <option value="todos">👥 Todos los médicos</option>
                    </select>
                  </div>

                  <button 
                    className="btn btn-sm btn-link text-decoration-none fw-semibold"
                    style={{ color: '#842029' }}
                    onClick={handleLogout}
                    title="Cerrar sesión"
                  >
                    <i className="bi bi-box-arrow-left me-1"></i>
                    Salir
                  </button>
                </div>
              </div>

              {/* Mensajes de error si ocurrieran al consultar la API */}
              {errorCitas && (
                <div className="alert alert-danger py-2 small d-flex align-items-center gap-2 mb-3" role="alert">
                  <i className="bi bi-exclamation-triangle-fill"></i>
                  <span>{errorCitas}</span>
                </div>
              )}

              {/* Tabla de Registros */}
              <div className="table-responsive" style={{ maxHeight: '420px', overflowY: 'auto' }}>
                <table className="table align-middle table-hover table-sm mb-0">
                  <thead className="sticky-top" style={{ backgroundColor: '#FCFAF6', zIndex: 1 }}>
                    <tr style={{ color: '#084E4C', borderBottom: '2px solid #D2EBE7' }}>
                      <th className="py-2">Paciente</th>
                      <th className="py-2">Correo</th>
                      <th className="py-2">Teléfono</th>
                      <th className="py-2">Médico Asignado</th>
                      <th className="py-2">Especialidad</th>
                      <th className="py-2">Fecha</th>
                      <th className="py-2">Hora</th>
                      <th className="py-2 text-center">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cargandoCitas ? (
                      <tr>
                        <td colSpan="8" className="text-center py-5 text-muted">
                          <div className="spinner-border spinner-border-sm me-2 text-teal" style={{ color: '#084E4C' }} role="status"></div>
                          <span>Cargando citas del profesional...</span>
                        </td>
                      </tr>
                    ) : citas.length === 0 ? (
                      <tr>
                        <td colSpan="8" className="text-center text-muted py-5">
                          <i className="bi bi-inbox display-6 d-block mb-2 text-muted"></i>
                          <p className="fw-semibold mb-0">No se encontraron citas registradas para este médico.</p>
                          <small>Los nuevos turnos agendados por los pacientes aparecerán aquí automáticamente.</small>
                        </td>
                      </tr>
                    ) : (
                      citas.map((cita) => (
                        <tr key={cita._id || cita.id}>
                          <td className="fw-semibold py-2" style={{ color: '#084E4C' }}>
                            <i className="bi bi-person me-1 text-muted"></i>
                            {cita.nombrePaciente}
                          </td>
                          <td className="text-muted small py-2">{cita.email}</td>
                          <td className="text-muted small py-2">{cita.telefono}</td>
                          <td className="fw-semibold small py-2" style={{ color: '#2F3E46' }}>{cita.doctor}</td>
                          <td className="text-muted small py-2">{cita.especialidad}</td>
                          <td className="py-2">{cita.fecha}</td>
                          <td className="py-2">{cita.hora}</td>
                          <td className="text-center py-2">
                            <span 
                              className="badge px-2 py-1 rounded-pill small" 
                              style={{ backgroundColor: '#D2EBE7', color: '#084E4C' }}
                            >
                              {cita.estado || 'Pendiente'}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default RegistrosModal;
