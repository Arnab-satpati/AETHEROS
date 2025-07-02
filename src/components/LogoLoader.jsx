import React, { useEffect } from "react";
import "../styles/LogoLoader.css";

const LogoLoader = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hide loader after animation
    }, 10000); // ⏱️ Matches total animation time

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="logo-loader">
      <div className="logo-container">
        <div className="logo-animate">
          <img src="/logo.png" alt="AetherOS Logo" />
        </div>
        <p className="boot-text">Booting AetherOS...</p>
      </div>
    </div>
  );
};

export default LogoLoader;
