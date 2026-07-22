import React from 'react';

function Medicos({ onReserveDoctor }) {
  const doctores = [
    { 
      nombre: "Dra. Elena Romero", 
      especialidad: "Medicina General", 
      experiencia: "12 años de experiencia", 
      dias: ["Lun", "Mié", "Vie"],
      img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80&w=500"
    },
    { 
      nombre: "Dr. Carlos Mendoza", 
      especialidad: "Cardiología", 
      experiencia: "18 años de experiencia", 
      dias: ["Mar", "Jue"],
      img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300"
    },
    { 
      nombre: "Dra. Sofía Vargas", 
      especialidad: "Pediatría", 
      experiencia: "9 años de experiencia", 
      dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
      img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300"
    },
    { 
      nombre: "Dr. Andrés Torres", 
      especialidad: "Traumatología", 
      experiencia: "15 años de experiencia", 
      dias: ["Lun", "Mié", "Jue"],
      img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300"
    }
  ];

  return (
    <section id="medicos" className="py-5" style={{ backgroundColor: '#FCFAF6' }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <span className="text-uppercase fw-bold" style={{ color: '#084E4C', fontSize: '0.85rem' }}>Equipo Médico</span>
            <h2 className="display-4 fw-bold" style={{ color: '#084E4C' }}>Especialistas comprometidos con tu bienestar</h2>
          </div>
          <a href="#medicos" className="btn text-white px-4 py-2 d-none d-md-block" style={{ backgroundColor: '#084E4C', borderRadius: '10px' }}>
            Ver todos los médicos
          </a>
        </div>

        <div className="row g-4">
          {doctores.map((doc, i) => (
            <div className="col-md-6 col-lg-3" key={i}>
              <div className="card border-0 h-100 p-3" style={{ backgroundColor: '#F7F4EE', borderRadius: '20px' }}>
                <div className="position-relative">
                  <img 
                    src={doc.img} 
                    className="card-img-top" 
                    alt={doc.nombre} 
                    style={{ borderRadius: '15px', height: '220px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=500";
                    }}
                  />
                  {/* Días de Trabajo Flotantes */}
                  <div className="position-absolute bottom-0 start-0 m-2 d-flex gap-1 flex-wrap">
                    {doc.dias.map((dia, idx) => (
                      <span key={idx} className="badge" style={{ backgroundColor: '#084E4C', color: '#FCFAF6', fontSize: '0.7rem' }}>{dia}</span>
                    ))}
                  </div>
                </div>
                <div className="card-body px-0 pb-0 d-flex flex-column justify-content-between">
                  <div>
                    <span className="text-uppercase text-muted fw-bold" style={{ fontSize: '0.75rem' }}>{doc.especialidad}</span>
                    <h5 className="card-title fw-bold" style={{ color: '#084E4C' }}>{doc.nombre}</h5>
                    <p className="card-text text-muted small">{doc.experiencia}</p>
                  </div>
                  <button 
                    onClick={() => onReserveDoctor(doc)}
                    className="btn w-100 mt-3 py-2 fw-semibold" 
                    style={{ border: '2.5px solid #084E4C', color: '#084E4C', backgroundColor: 'transparent', borderRadius: '10px' }}
                  >
                    Reservar con {doc.nombre.split(' ')[1]}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Medicos;