import React, { useState } from 'react';
import axios from 'axios';

function ConsultaCitaModal({ onClose }) {
  const [telefono, setTelefono] = useState('');
  const [citas, setCitas] = useState(null); // null = no se ha buscado aún, [] = sin resultados
  const [cargando, setCargando] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  const handleBuscar = async (e) => {
    e?.preventDefault();
    if (!telefono.trim()) {
      setErrorMsg('Por favor, ingresa un número de teléfono válido.');
      return;
    }

    setErrorMsg('');
    setCargando(true);
    setBusquedaRealizada(false);
    setCitas(null);

    try {
      // Consumir REST endpoint del backend para buscar citas por número de teléfono
      const cleanPhone = telefono.trim();
      const res = await axios.get(`http://localhost:5000/api/citas/telefono/${encodeURIComponent(cleanPhone)}`);
      
      if (res.data.success && Array.isArray(res.data.data)) {
        setCitas(res.data.data);
      } else {
        setCitas([]);
      }
      setBusquedaRealizada(true);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setCitas([]);
        setBusquedaRealizada(true);
      } else {
        // En caso de error inesperado o falla de red
        setErrorMsg(error.response?.data?.message || 'Ocurrió un error al consultar las citas. Intente nuevamente.');
        setCitas([]);
        setBusquedaRealizada(true);
      }
    } finally {
      setCargando(false);
    }
  };

  // Ayudante para colores de badge según el estado
  const getBadgeStyle = (estado) => {
    switch (estado?.toLowerCase()) {
      case 'confirmada':
        return { backgroundColor: '#d1e7dd', color: '#0f5132' };
      case 'atendida':
        return { backgroundColor: '#cff4fc', color: '#055160' };
      case 'cancelada':
        return { backgroundColor: '#f8d7da', color: '#842029' };
      case 'pendiente':
      default:
        return { backgroundColor: '#D2EBE7', color: '#084E4C' };
    }
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
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div 
          className="modal-content border-0 p-4 shadow-lg" 
          style={{ 
            backgroundColor: '#FCFAF6', 
            borderRadius: '24px',
            animation: 'slideUp 0.25s ease-in-out'
          }}
        >
          {/* Header del Modal */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <div 
                className="d-flex align-items-center justify-content-center text-white" 
                style={{ width: '38px', height: '38px', backgroundColor: '#084E4C', borderRadius: '10px' }}
              >
                <i className="bi bi-search fs-5"></i>
              </div>
              <h3 className="fw-bold mb-0" style={{ color: '#084E4C' }}>Consultar Cita</h3>
            </div>
            <button 
              type="button" 
              className="btn-close" 
              onClick={onClose} 
              style={{ boxShadow: 'none' }}
              aria-label="Cerrar"
            ></button>
          </div>

          <p className="text-muted mb-4">
            Ingresa tu número de teléfono para verificar el estado de tus citas médicas registradas.
          </p>

          {/* Formulario de Búsqueda */}
          <form onSubmit={handleBuscar} className="mb-4">
            <div className="row g-2 align-items-center">
              <div className="col-12 col-md-8">
                <div className="position-relative">
                  <i 
                    className="bi bi-telephone position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
                    style={{ fontSize: '1rem' }}
                  ></i>
                  <input
                    type="tel"
                    className="form-control py-2 ps-5 border-0"
                    style={{ 
                      backgroundColor: '#F7F4EE', 
                      borderRadius: '12px',
                      color: '#2F3E46',
                      boxShadow: 'none'
                    }}
                    placeholder="Ej: 987654321"
                    value={telefono}
                    onChange={(e) => {
                      setTelefono(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-4">
                <button
                  type="submit"
                  className="btn w-100 py-2 text-white fw-bold d-flex align-items-center justify-content-center gap-2"
                  style={{ backgroundColor: '#084E4C', borderRadius: '12px' }}
                  disabled={cargando}
                >
                  {cargando ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span>Buscando...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-search"></i>
                      <span>Buscar</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>

          {/* Mensaje de error de validación o servidor */}
          {errorMsg && (
            <div className="alert alert-danger py-2 px-3 mb-4 rounded-3 small d-flex align-items-center gap-2" role="alert">
              <i className="bi bi-exclamation-triangle-fill"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Resultados de la Búsqueda */}
          {busquedaRealizada && citas !== null && (
            <div>
              {citas.length === 0 ? (
                <div 
                  className="p-4 text-center rounded-3 border"
                  style={{ backgroundColor: '#F7F4EE', borderColor: '#E5E4E7' }}
                >
                  <i className="bi bi-calendar-x text-muted display-6 d-block mb-2"></i>
                  <p className="fw-semibold mb-1" style={{ color: '#2F3E46' }}>
                    No se encontraron citas asociadas a este número de teléfono.
                  </p>
                  <small className="text-muted">
                    Verifica que hayas ingresado el número correctamente o agenda una nueva cita en nuestra web.
                  </small>
                </div>
              ) : (
                <div>
                  <h6 className="fw-bold mb-3" style={{ color: '#084E4C' }}>
                    Citas encontradas ({citas.length}):
                  </h6>
                  <div className="d-flex flex-column gap-3" style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '4px' }}>
                    {citas.map((cita) => (
                      <div 
                        key={cita._id || cita.id} 
                        className="card border-0 p-3 shadow-sm"
                        style={{ backgroundColor: '#FFFFFF', borderRadius: '14px', borderLeft: '4px solid #084E4C' }}
                      >
                        <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-2">
                          <div>
                            <h5 className="fw-bold mb-0" style={{ color: '#084E4C' }}>
                              <i className="bi bi-person-fill me-2"></i>
                              {cita.nombrePaciente}
                            </h5>
                            <span className="text-muted small">Teléfono: {cita.telefono}</span>
                          </div>
                          <span 
                            className="badge px-3 py-2 rounded-pill fw-semibold" 
                            style={getBadgeStyle(cita.estado)}
                          >
                            {cita.estado || 'Pendiente'}
                          </span>
                        </div>

                        <hr className="my-2 text-muted opacity-25" />

                        <div className="row g-2 mt-1">
                          <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                              <i className="bi bi-person-badge text-teal" style={{ color: '#084E4C' }}></i>
                              <span><strong>Médico:</strong> {cita.doctor}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bi bi-award text-teal" style={{ color: '#084E4C' }}></i>
                              <span><strong>Especialidad:</strong> {cita.especialidad}</span>
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center gap-2 text-muted small mb-1">
                              <i className="bi bi-calendar-event text-teal" style={{ color: '#084E4C' }}></i>
                              <span><strong>Fecha:</strong> {cita.fecha}</span>
                            </div>
                            <div className="d-flex align-items-center gap-2 text-muted small">
                              <i className="bi bi-clock text-teal" style={{ color: '#084E4C' }}></i>
                              <span><strong>Hora:</strong> {cita.hora}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default ConsultaCitaModal;
