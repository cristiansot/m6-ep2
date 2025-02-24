import { useState, useEffect } from 'react';
import DoctorCard from './components/DoctorCard';
import Logo from './components/Logo';
import OfflineBanner from './components/OfflineBanner';
import InstallButton from './components/InstallButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

interface Doctor {
  nombre: string;
  imagen: string;
  especialidad: string;
  resumen: string;
  años_experiencia: number;
  valor_consulta: number;
  informacion_adicional: {
    horarios_disponibles: string[];
    contacto: {
      telefono: string;
      email: string;
    };
  };
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registrado:', registration);
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  });
}

function App() {
  const [equipo, setEquipo] = useState<Doctor[]>([]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js') 
          .then((registration) => {
            console.log('Service Worker registrado con éxito:', registration);
          })
          .catch((error) => {
            console.error('Error al registrar el Service Worker:', error);
          });
      });
    }
  }, []);

  useEffect(() => {
    fetch('src/assets/equipo.json')
      .then((response) => response.json())
      .then((data) => setEquipo(data))
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []);

  return (
    <>
      <OfflineBanner />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
        <Logo />
        <InstallButton />
      </div>
      <div className="container" style={{ marginBottom: 40 }}>
        <div className="row">
          {equipo.map((doctor, index) => (
            <div className="col-md-4" key={index}>
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;