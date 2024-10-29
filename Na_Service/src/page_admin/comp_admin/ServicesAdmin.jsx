import React from "react";
import "./Services.css";
import { Link } from "react-router-dom";

const Services = () => {
  return (
    <div className="services-section">
      <h1>Nos Services</h1>
      <div className="services-container">
        <div className="service-card">
          <h2>Prestations Avicoles</h2>
          <p className="subtitle">Solutions innovantes pour l'industrie avicole</p>
          <p>
            Nos prestations avicoles couvrent tous les aspects de la production
            et de la santé des volailles, de l'élevage à la transformation. Nous
            offrons des solutions sur mesure pour optimiser votre exploitation
            avicole.
          </p>
          <br />  <br />
          <Link to="/Prestations_Avicoles_admin" className="learn-more">En savoir plus</Link>
          <br />         <br /> 
        </div>

        <div className="service-card">
          <h2>Prestations Viticoles</h2>
          <p className="subtitle">Expertise complète pour votre vignoble</p>
          <p>
            Nos prestations viticoles englobent tous les aspects de la
            viticulture, de la plantation à la récolte. Nous vous accompagnons
            pour améliorer la qualité de vos vignes et optimiser votre
            production viticole.
          </p>
          <br />  <br />
          <Link to="/PrestationsViticoles_admin" className="learn-more">En savoir plus</Link>
          <br />         <br /> 
        </div>
      </div>
      <br /><br /><br />     <br /><br />
    </div>
  );
};

export default Services;
