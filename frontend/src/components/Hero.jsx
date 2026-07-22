import React from 'react';

function Hero({ onReserve }) {
  return (
    <section id="hero" className="py-5" style={{ backgroundColor: '#FCFAF6' }}>
      <div className="container">
        <div className="row align-items-center">
          {/* Texto Principal */}
          <div className="col-lg-6">
            <span className="badge px-3 py-2 mb-3 text-uppercase fw-bold" 
                  style={{ backgroundColor: '#D2EBE7', color: '#084E4C', borderRadius: '20px' }}>
              ● Atención de Excelencia
            </span>
            <h1 className="display-3 fw-bold mb-3" style={{ color: '#084E4C', lineHeight: '1.1' }}>
              Tu salud, <br />
              <span className="fst-italic fw-normal text-decoration-underline" style={{ color: '#084E4C' }}>nuestra</span> prioridad
            </h1>
            <p className="lead mb-4 text-muted" style={{ maxWidth: '480px' }}>
              Atención médica integral con especialistas comprometidos. Reserva tu cita en minutos y recibe el cuidado que mereces.
            </p>
            <div className="d-flex gap-3">
              <button 
                className="btn text-white px-4 py-3 fw-semibold" 
                style={{ backgroundColor: '#084E4C', borderRadius: '10px' }}
                onClick={onReserve}
              >
                Reservar Cita →
              </button>
              <a 
                href="#servicios" 
                className="btn px-4 py-3 fw-semibold" 
                style={{ border: '2px solid #084E4C', color: '#084E4C', borderRadius: '10px', backgroundColor: 'transparent' }}
              >
                Ver Servicios
              </a>
            </div>
          </div>

          {/* Imagen Ilustrativa del Figma */}
          <div className="col-lg-6 mt-5 mt-lg-0">
            <div className="position-relative">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                alt="Médicos Salud Plena" 
                className="img-fluid"
                style={{ borderRadius: '24px', objectFit: 'cover', height: '420px', width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Sección de Estadísticas Inferior */}
        <div className="row mt-5 pt-4 border-top" style={{ borderColor: '#E3DFD5' }}>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold" style={{ color: '#084E4C' }}>+4.800</h3>
            <p className="text-muted small">Pacientes atendidos</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold" style={{ color: '#084E4C' }}>98%</h3>
            <p className="text-muted small">Satisfacción</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold" style={{ color: '#084E4C' }}>6</h3>
            <p className="text-muted small">Especialidades</p>
          </div>
          <div className="col-6 col-md-3">
            <h3 className="fw-bold" style={{ color: '#084E4C' }}>15+</h3>
            <p className="text-muted small">Años de trayectoria</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;