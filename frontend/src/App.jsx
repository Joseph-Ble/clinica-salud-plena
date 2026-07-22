import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Servicios from './components/Servicios';
import Medicos from './components/Medicos';
import SobreNosotros from './components/SobreNosotros';
import Contacto from './components/Contacto';
import BookingModal from './components/BookingModal';
import ConsultaCitaModal from './components/ConsultaCitaModal';
import RegistrosModal from './components/RegistrosModal';

function App() {
  // Estados para controlar el Modal de Reservas
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Maneja los pasos 1, 2, 3 y 4 (Confirmación)
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  // Estados para el modal de Consulta de Citas (público) y Registros (con login)
  const [isConsultaOpen, setIsConsultaOpen] = useState(false);
  const [isRegistrosOpen, setIsRegistrosOpen] = useState(false);

  // Caso A: Click en "Reservar Cita" (Navbar, Hero o Sobre Nosotros)
  // Inicia el flujo desde el Paso 1 para elegir especialidad/médico
  const handleGenericBooking = () => {
    setSelectedDoctor(null); 
    setCurrentStep(1);       
    setIsModalOpen(true);
  };

  // Caso B: Click en "Reservar con [Nombre]" (Tarjetas de Médicos)
  // Guarda el doctor seleccionado y salta directamente al Paso 2 (Fecha y Hora)
  const handleDoctorBooking = (doctor) => {
    setSelectedDoctor(doctor); 
    setCurrentStep(2);         // Se salta el paso 1
    setIsModalOpen(true);
  };

  return (
    <div style={{ backgroundColor: '#FCFAF6', minHeight: '100vh', color: '#2F3E46' }}>
      
      {/* 1. Barra de Navegación */}
      <Navbar
        onReserve={handleGenericBooking}
        onConsultarCita={() => setIsConsultaOpen(true)}
        onVerRegistros={() => setIsRegistrosOpen(true)}
      />

      {/* 2. Sección Principal (Hero) */}
      <Hero onReserve={handleGenericBooking} />

      {/* 3. Grid de Especialidades / Servicios */}
      <Servicios />

      {/* 4. Sección de Médicos con botones de reserva directa */}
      <Medicos onReserveDoctor={handleDoctorBooking} />

      {/* 5. Franja Informativa de Historia y Estadísticas */}
      <SobreNosotros onReserve={handleGenericBooking} />

      {/* 6. Formulario de Contacto, Ubicación y Footer */}
      <Contacto />

      {/* 7. Modal Multistep de Reserva de Citas */}
      {isModalOpen && (
        <BookingModal
          step={currentStep}
          setStep={setCurrentStep}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {/* 8. Modal de Consulta de Citas (acceso público) */}
      {isConsultaOpen && (
        <ConsultaCitaModal
          onClose={() => setIsConsultaOpen(false)}
        />
      )}

      {/* 9. Modal de Registros (requiere login del personal) */}
      {isRegistrosOpen && (
        <RegistrosModal onClose={() => setIsRegistrosOpen(false)} />
      )}
      
    </div>
  );
}

export default App;