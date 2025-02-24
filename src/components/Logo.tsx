import React from 'react';
import logo from '../assets/img/logotipo.png';

const Logo: React.FC = () => {
  return (
    <div className="logo-container" style={{ marginTop: 20 }}>
      <img src={logo} alt="Logotipo" className="logo" />
    </div>
  );
};

export default Logo;
