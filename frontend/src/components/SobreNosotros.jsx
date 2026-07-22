import React from 'react';

function SobreNosotros({ onReserve }) {
  return (
    <section id="sobre-nosotros" className="py-5 text-white" style={{ backgroundColor: '#084E4C' }}>
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Columna Izquierda: Historia */}
          <div className="col-lg-6">
            <span className="text-uppercase fw-bold text-muted" style={{ color: '#D2EBE7 !important', fontSize: '0.85rem' }}>Nuestra Historia</span>
            <h2 className="display-4 fw-bold my-3">Más de 15 años cuidando a familias</h2>
            <p className="mb-4" style={{ color: '#D2EBE7', opacity: 0.9 }}>
              Desde 2009, Clínica Salud Plena ha sido el referente de atención médica integral en nuestra comunidad. Contamos con equipamiento de última generación y un equipo humano comprometido con la excelencia.
            </p>
            <p className="mb-4" style={{ color: '#D2EBE7', opacity: 0.9 }}>
              Nuestro modelo de atención sitúa al paciente en el centro de cada decisión, garantizando diagnósticos precisos y tratamientos personalizados.
            </p>
            <button 
              className="btn px-4 py-3 fw-bold" 
              style={{ backgroundColor: '#20C997', color: '#084E4C', borderRadius: '10px' }}
              onClick={onReserve}
            >
              Reservar consulta
            </button>
          </div>

          {/* Columna Derecha: Tarjetas */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="row g-4">
              <div className="col-sm-6">
                <div className="p-4 text-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="bi bi-people fs-2 text-info"></i>
                  <h3 className="fw-bold mt-2">4.800+</h3>
                  <p className="small text-muted mb-0">Pacientes anuales</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 text-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="bi bi-star fs-2 text-warning"></i>
                  <h3 className="fw-bold mt-2">98%</h3>
                  <p className="small text-muted mb-0">Satisfacción</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 text-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="bi bi-activity fs-2 text-danger"></i>
                  <h3 className="fw-bold mt-2">20+</h3>
                  <p className="small text-muted mb-0">Especialistas</p>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="p-4 text-center h-100" style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <i className="bi bi-trophy fs-2 text-warning"></i>
                  <h3 className="fw-bold mt-2">15+</h3>
                  <p className="small text-muted mb-0">Años de experiencia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SobreNosotros;