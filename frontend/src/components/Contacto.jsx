import React from 'react';

function Contacto() {
  return (
    <section id="contacto" className="py-5" style={{ backgroundColor: '#FCFAF6' }}>
      <div className="container">
        <div className="row g-5 align-items-center">
          {/* Info */}
          <div className="col-lg-5">
            <span className="text-uppercase fw-bold" style={{ color: '#084E4C', fontSize: '0.85rem' }}>Contacto</span>
            <h2 className="display-4 fw-bold mb-4" style={{ color: '#084E4C' }}>¿Cómo llegar?</h2>
            <p className="text-muted mb-5">Estamos ubicados en el centro de la ciudad, con fácil acceso en transporte público y estacionamiento propio.</p>
            
            <ul className="list-unstyled">
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-geo-alt fs-4 me-3" style={{ color: '#084E4C' }}></i>
                <a 
                  href="https://maps.app.goo.gl/XBNqHy5AnjRFtEHH6" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-decoration-none"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.target.style.color = '#084E4C'}
                  onMouseLeave={(e) => e.target.style.color = 'inherit'}
                >
                  Av. Médicos 1234, Centro, Ciudad
                </a>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-telephone fs-4 me-3" style={{ color: '#084E4C' }}></i>
                <span>+51 912 345 678</span>
              </li>
              <li className="d-flex align-items-center mb-3">
                <i className="bi bi-envelope fs-4 me-3" style={{ color: '#084E4C' }}></i>
                <a 
                  href="mailto:citas@clinicasaludplena.com?subject=Consulta%20sobre%20una%20cita%20m%C3%A9dica" 
                  className="text-decoration-none"
                  style={{ color: 'inherit' }}
                  onMouseEnter={(e) => e.target.style.color = '#084E4C'}
                  onMouseLeave={(e) => e.target.style.color = 'inherit'}
                >
                  citas@clinicasaludplena.com
                </a>
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-clock fs-4 me-3" style={{ color: '#084E4C' }}></i>
                <span>Lun–Vie: 08:00–20:00 · Sáb: 09:00–14:00</span>
              </li>
            </ul>
          </div>

          {/* Form */}
          <div className="col-lg-7">
            <div className="p-5" style={{ backgroundColor: '#F7F4EE', borderRadius: '24px' }}>
              <h3 className="fw-bold mb-4" style={{ color: '#084E4C' }}>Envíanos un mensaje</h3>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-3">
                  <input type="text" className="form-control py-3 border-0" placeholder="Nombre completo" style={{ borderRadius: '10px' }} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control py-3 border-0" placeholder="Correo electrónico" style={{ borderRadius: '10px' }} />
                </div>
                <div className="mb-3">
                  <input type="tel" className="form-control py-3 border-0" placeholder="Teléfono" style={{ borderRadius: '10px' }} />
                </div>
                <div className="mb-4">
                  <textarea className="form-control py-3 border-0" rows="4" placeholder="Mensaje" style={{ borderRadius: '10px' }}></textarea>
                </div>
                <button type="submit" className="btn text-white w-100 py-3 fw-bold" style={{ backgroundColor: '#084E4C', borderRadius: '10px' }}>
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-5 pt-4 border-top text-center text-muted small" style={{ borderColor: '#E3DFD5' }}>
          <p className="mb-0">© 2024 Clínica Salud Plena · Todos los derechos reservados</p>
        </footer>
      </div>
    </section>
  );
}

export default Contacto;