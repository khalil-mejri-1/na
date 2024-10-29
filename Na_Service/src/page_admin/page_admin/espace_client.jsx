// src/components/ClientSpace.js
import './espace_client.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import React, { useEffect, useState } from 'react';

const EspaceClient_admin = () => {
  const [activeTab, setActiveTab] = useState('connexion');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
        <Navbar/>
    <div className='bloc_espace_client'>
    <div className="client-space">
     
   

      <div className="right-section">
      <h1>Espace Client</h1>
        <div className="tabs">
          <button
            className={activeTab === 'connexion' ? 'active' : ''}
            onClick={() => handleTabClick('connexion')}
          >
            Connexion
          </button>
          <button
            className={activeTab === 'inscription' ? 'active' : ''}
            onClick={() => handleTabClick('inscription')}
          >
            Inscription
          </button>
        </div>

        {activeTab === 'connexion' && (
          <div className="form-container">
            <h2>Connexion</h2>
            <p>Connectez-vous à votre compte client</p>
            <form>
              <label>Email</label>
              <input type="email" placeholder="vous@exemple.com" />
              <label>Mot de passe</label>
              <input type="password" placeholder="Mot de passe" />
              <button type="submit">Se connecter</button>
            </form>
          </div>
        )}

        {activeTab === 'inscription' && (
         <div className="form-container">
         <h2>Inscription</h2>
         <p>Créez votre compte client</p>
         <form>
           <label>Nom</label>
           <input type="text" placeholder="Votre nom" />
           
           <label>Prénom</label>
           <input type="text" placeholder="Votre prénom" />
           
           <label>Email</label>
           <input type="email" placeholder="vous@exemple.com" />
           
           <label>Mot de passe</label>
           <input type="password" placeholder="Mot de passe" />
           
           <button type="submit">S'inscrire</button>
         </form>
       </div>
       
        )}
      </div>
    </div>
    </div>
    </>
  );
};

export default EspaceClient_admin;
