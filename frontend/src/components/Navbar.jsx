import React from 'react';

function Navbar({ onReserve, onConsultarCita, onVerRegistros }) {
  // Función para cerrar automáticamente el menú hamburguesa en móvil
  const closeMobileMenu = () => {
    const navEl = document.getElementById('navbarNav');
    if (navEl && navEl.classList.contains('show')) {
      const toggler = document.querySelector('.navbar-toggler');
      if (toggler && getComputedStyle(toggler).display !== 'none') {
        toggler.click();
      } else {
        navEl.classList.remove('show');
      }
    }
  };

  // Manejador para los enlaces de navegación por secciones
  const handleNavClick = (e, targetId) => {
    closeMobileMenu();
    if (targetId) {
      e.preventDefault();
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = targetId;
      }
    }
  };

  // Manejadores para los botones de acción
  const handleConsultarCita = () => {
    closeMobileMenu();
    onConsultarCita();
  };

  const handleVerRegistros = () => {
    closeMobileMenu();
    onVerRegistros();
  };

  const handleReserve = () => {
    closeMobileMenu();
    onReserve();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top py-3" style={{ backgroundColor: '#FCFAF6' }}>
      <div className="container">
        {/* Logo de la Clínica */}
        <a 
          className="navbar-brand d-flex align-items-center" 
          href="#hero" 
          onClick={(e) => handleNavClick(e, 'hero')}
        >
          <div 
            className="d-flex align-items-center justify-content-center me-2 text-white" 
            style={{ width: '40px', height: '40px', backgroundColor: '#084E4C', borderRadius: '10px' }}
          >
            <i className="bi bi-plus-lg fs-4"></i>
          </div>
          <span className="fw-bold" style={{ color: '#084E4C', fontSize: '1.4rem' }}>
            Clínica Salud <span className="fst-italic fw-normal">Plena</span>
          </span>
        </a>

        {/* Botón de Hamburguesa para responsive */}
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Enlaces y botones de acción */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item me-4">
              <a 
                className="nav-link fw-semibold" 
                href="#servicios" 
                style={{ color: '#2F3E46' }}
                onClick={(e) => handleNavClick(e, 'servicios')}
              >
                Servicios
              </a>
            </li>
            <li className="nav-item me-4">
              <a 
                className="nav-link fw-semibold" 
                href="#medicos" 
                style={{ color: '#2F3E46' }}
                onClick={(e) => handleNavClick(e, 'medicos')}
              >
                Médicos
              </a>
            </li>
            <li className="nav-item me-4">
              <a 
                className="nav-link fw-semibold" 
                href="#sobre-nosotros" 
                style={{ color: '#2F3E46' }}
                onClick={(e) => handleNavClick(e, 'sobre-nosotros')}
              >
                Sobre Nosotros
              </a>
            </li>
            <li className="nav-item me-4">
              <a 
                className="nav-link fw-semibold" 
                href="#contacto" 
                style={{ color: '#2F3E46' }}
                onClick={(e) => handleNavClick(e, 'contacto')}
              >
                Contacto
              </a>
            </li>
            <li className="nav-item me-2">
              <button
                className="btn px-3 py-2 fw-semibold d-flex align-items-center gap-1"
                style={{ border: '2px solid #084E4C', color: '#084E4C', backgroundColor: 'transparent', borderRadius: '10px' }}
                onClick={handleConsultarCita}
              >
                <i className="bi bi-search" style={{ fontSize: '0.85rem' }}></i>
                Consultar Cita
              </button>
            </li>
            <li className="nav-item me-2">
              <button
                className="btn px-3 py-2 fw-semibold d-flex align-items-center gap-1"
                style={{ border: '2px solid #084E4C', color: '#084E4C', backgroundColor: 'transparent', borderRadius: '10px' }}
                onClick={handleVerRegistros}
                title="Acceso solo para personal de la clínica"
              >
                <i className="bi bi-lock-fill" style={{ fontSize: '0.85rem' }}></i>
                Registros
              </button>
            </li>
            <li className="nav-item">
              <button 
                className="btn text-white px-4 py-2 fw-semibold" 
                style={{ backgroundColor: '#084E4C', borderRadius: '10px' }}
                onClick={handleReserve}
              >
                Reservar Cita
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;