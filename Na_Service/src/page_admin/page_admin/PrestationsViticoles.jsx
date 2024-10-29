import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom';
import './PrestationsViticoles.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";

function PrestationsViticoles_admin() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // جلب الصور من API
    axios.get('http://localhost:3000/prestations-viticoles')
      .then(response => {
        setImages(response.data);
      })
      .catch(error => {
        // معالجة الأخطاء
        if (error.response) {
          console.error('Server responded with error:', error.response.data);
          console.error('Status code:', error.response.status);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Axios Error:', error.message);
        }
      });
  }, []);

  // فلترة الصور حسب الفئة
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Travaux manuels');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Travaux mécaniques');
  const filteredImages3 = images.filter(imageData => imageData.selectCategory === 'Taille des vignes');
  const filteredImages4 = images.filter(imageData => imageData.selectCategory === 'Vendanges');

  // اختيار آخر صورة من كل فئة
  const lastImage = filteredImages[filteredImages.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];
  const lastImage3 = filteredImages3[filteredImages3.length - 1];
  const lastImage4 = filteredImages4[filteredImages4.length - 1];

  return (
    <>
      <Navbar />
      <div className="vineyard-services">
        <h1>Prestations Viticoles</h1>
        <p>
          Nos prestations viticoles couvrent l'ensemble du cycle de production de votre vignoble. 
          De la taille à la vendange, en passant par les travaux manuels et mécaniques, nous mettons 
          notre expertise au service de la qualité de vos vins.
        </p>
        <div className="services-container">
          {lastImage && (
            <ServiceCard
              key={lastImage._id} // استخدام المعرف الصحيح
              title="Travaux manuels"
              description="Nos équipes expérimentées effectuent avec précision tous les travaux manuels nécessaires dans votre vignoble, tels que l'ébourgeonnage et l'effeuillage."
              link="/Travauxmanuels_admin"
              imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من صحة تنسيق الصورة
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id} // استخدام المعرف الصحيح
              title="Travaux mécaniques"
              description="Nos équipes utilisent des machines de pointe pour optimiser les travaux mécaniques dans votre vignoble, assurant efficacité et précision."
              link="/Travaux_mecaniques_admin"
              imageSrc={lastImage2.img ? `data:image/jpeg;base64,${lastImage2.img}` : ''}
            />
          )}
          
          {lastImage3 && (
            <ServiceCard
              key={lastImage3._id} // استخدام المعرف الصحيح
              title="Taille des vignes"
              description="Nos équipes effectuent une taille précise pour améliorer la qualité des récoltes."
              link="/taille_des_vignes_admin"
              imageSrc={lastImage3.img ? `data:image/jpeg;base64,${lastImage3.img}` : ''}
            />
          )}

          {lastImage4 && (
            <ServiceCard
              key={lastImage4._id} // استخدام المعرف الصحيح
              title="Vendanges"
              description="Nos équipes expérimentées garantissent des vendanges de qualité, en respectant les meilleures pratiques pour préserver l'intégrité des raisins."
              link="/Vendanges_admin"
              imageSrc={lastImage4.img ? `data:image/jpeg;base64,${lastImage4.img}` : ''}
            />
          )} 
        </div>
      </div>
    </>
  );
}

function ServiceCard({ title, description, link, imageSrc }) {
  return (
    <div className="service-card">
      <img src={imageSrc} alt={title} className="service-image" />
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to={link} className="service-button">En savoir plus</Link>
    </div>
  );
}

export default PrestationsViticoles_admin;
