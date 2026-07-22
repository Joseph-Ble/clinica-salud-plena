import React from 'react';

function HorariosModal({ onClose, onReserveDoctor }) {
  const doctores = [
    {
      nombre: "Dra. Elena Romero",
      especialidad: "Medicina General",
      dias: ["Lun", "Mié", "Vie"],
      horario: "08:00 - 12:00"
    },
    {
      nombre: "Dr. Carlos Mendoza",
      especialidad: "Cardiología",
      dias: ["Mar", "Jue"],
      horario: "15:00 - 17:30"
    },
    {
      nombre: "Dra. Sofía Vargas",
      especialidad: "Pediatría",
      dias: ["Lun", "Mar", "Mié", "Jue", "Vie"],
      horario: "08:00 - 11:30"
    },
    {
      nombre: "Dr. Andrés Torres",
      especialidad: "Traumatología",
      dias: ["Lun", "Mié", "Jue"],
      horario: "15:00 - 17:30"
    }
  ];

  return (
    <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(4px)' }}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content border-0 p-4" style={{ backgroundColor: '#FCFAF6', borderRadius: '24px' }}>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h2 className="fw-bold mb-0" style={{ color: '#084E4C' }}>Horario de atención</h2>
            <button type="button" className="btn-close" onClick={onClose} style={{ boxShadow: 'none' }}></button>
          </div>
          <p className="text-muted mb-4">Consulta qué días y en qué horario atiende cada especialista.</p>

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr style={{ color: '#084E4C' }}>
                  <th>Médico</th>
                  <th>Especialidad</th>
                  <th>Días</th>
                  <th>Horario</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {doctores.map((doc, i) => (
                  <tr key={i}>
                    <td className="fw-semibold" style={{ color: '#084E4C' }}>{doc.nombre}</td>
                    <td className="text-muted">{doc.especialidad}</td>
                    <td>
                      <div className="d-flex gap-1 flex-wrap">
                        {doc.dias.map((dia, idx) => (
                          <span key={idx} className="badge" style={{ backgroundColor: '#D2EBE7', color: '#084E4C', fontSize: '0.75rem' }}>{dia}</span>
                        ))}
                      </div>
                    </td>
                    <td className="text-muted">{doc.horario}</td>
                    <td>
                      <button
                        className="btn btn-sm fw-semibold"
                        style={{ border: '2px solid #084E4C', color: '#084E4C', backgroundColor: 'transparent', borderRadius: '8px' }}
                        onClick={() => onReserveDoctor(doc)}
                      >
                        Reservar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}

export default HorariosModal;
