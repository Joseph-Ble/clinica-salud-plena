import React from 'react';

function Servicios() {
  const especialidades = [
    { title: "Consulta General", icon: "bi-activity", desc: "Evaluación completa de salud con diagnóstico y orientación médica personalizada." },
    { title: "Cardiología", icon: "bi-heart-pulse", desc: "Estudio y tratamiento de enfermedades del corazón con tecnología de vanguardia." },
    { title: "Pediatría", icon: "bi-emoji-smile", desc: "Atención especializada para niños desde recién nacidos hasta la adolescencia." },
    { title: "Traumatología", icon: "bi-bandaid", desc: "Diagnóstico y tratamiento de lesiones musculoesqueléticas y rehabilitación." },
    { title: "Laboratorio", icon: "bi-activity", desc: "Análisis clínicos con resultados en 24 horas y acceso digital a sus informes." },
    { title: "Diagnóstico por Imagen", icon: "bi-prescription2", desc: "Radiografías, ecografías y resonancias con interpretación médica inmediata." }
  ];

  return (
    <section id="servicios" className="py-5" style={{ backgroundColor: '#FCFAF6' }}>
      <div className="container">
        <span className="text-uppercase fw-bold tracking-wider" style={{ color: '#084E4C', fontSize: '0.85rem' }}>Especialidades</span>
        <h2 className="display-4 fw-bold mb-5" style={{ color: '#084E4C' }}>Atención médica completa en un solo lugar</h2>
        
        <div className="row g-4">
          {especialidades.map((esp, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="p-4 h-100" style={{ backgroundColor: '#F7F4EE', borderRadius: '16px' }}>
                <div className="fs-3 mb-3" style={{ color: '#084E4C' }}>
                  <i className={`bi ${esp.icon}`}></i>
                </div>
                <h4 className="fw-bold" style={{ color: '#084E4C' }}>{esp.title}</h4>
                <p className="text-muted mb-0">{esp.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;