import React from 'react';
import './ContactForm.css';
import Navbar from "../comp/NavBar.jsx";
function ContactForm() {
  return (
<>
<Navbar />
    <div className="contact-container">
      <h1>Contactez-nous</h1>
      <div className="form-wrapper">
        <div className="contact-form">
          <h2>Formulaire de contact</h2>
          <p style={{}}>Envoyez-nous un message et nous vous répondrons dans les plus brefs délais.</p>
          <form>
            <label htmlFor="name">Nom</label>
            <input type="text" id="name" name="name" />

            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />

            <label htmlFor="phone">Numéro de téléphone</label>
            <input type="tel" id="phone" name="phone" />

            <label htmlFor="message">Message</label>
            <textarea id="message" name="message"></textarea>

            <button type="submit">Envoyer</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Notre localisation</h2>
          <div className="map-placeholder">
            {/* هنا يمكنك تضمين خريطة Google أو صورة */}
            <img src="path-to-map-image.png" alt="Map" />
          </div>
          <br />
          <div className="contact-info-container">
      <h2>Autres moyens de contact</h2>
      <ul className="contact-details">
        <li>
          <i className="fas fa-phone"></i> +33 1 23 45 67 89
        </li>
        <li>
          <i className="fas fa-envelope"></i> contact@votreentreprise.com
        </li>
        <li>
          <i className="fas fa-map-marker-alt"></i> 123 Rue de l'Exemple, 75000 Paris, France
        </li>
      </ul>
      <div className="social-icons">
        <i className="fab fa-facebook"></i>
        <i className="fab fa-instagram"></i>
        <i className="fab fa-linkedin"></i>
      </div>
    </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default ContactForm;
