import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import './PrestationsViticoles.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import './travauxManuels.css'; 

function Travauxmanuels_admin() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    axios.get('http://localhost:3000/travaux-manuels') // تأكد من أن هذا هو عنوان API الصحيح
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
      });
  }, []);

  // فلترة الصور حسب الفئة
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Instalation des parcelles viticoles');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Cisaillage des plantations et entre plantation');
  const filteredImages3 = images.filter(imageData => imageData.selectCategory === 'Taille des vignes');
  const filteredImages4 = images.filter(imageData => imageData.selectCategory === 'Liage des bois');
  const filteredImages5 = images.filter(imageData => imageData.selectCategory === 'Ebourgeonnage des vignes');

  // اختيار آخر صورة من كل فئة
  const lastImage = filteredImages[filteredImages.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];
  const lastImage3 = filteredImages3[filteredImages3.length - 1];
  const lastImage4 = filteredImages4[filteredImages4.length - 1];
  const lastImage5 = filteredImages5[filteredImages5.length - 1];

  return (
    <>
      <Navbar />
      <div className="vineyard-services_travaux">
        <h1>Travaux manuels</h1>
        <div className="services-container_travaux">
          {lastImage && (
            <ServiceCard
              key={lastImage._id} // استخدم _id بدلاً من id لضمان عدم التعارض
              title="Installation des parcelles viticoles"
              description="Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes."
              link="/Installation_parcelles"
              imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من أن تنسيق الصورة صحيح
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id}
              title="Cisaillage des plantations"
              description="Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes."
              link="/Cisaillage"
              imageSrc={lastImage2.img ? `data:image/jpeg;base64,${lastImage2.img}` : ''}
            />
          )}

          {lastImage3 && (
            <ServiceCard
              key={lastImage3._id}
              title="Taille des vignes"
              description="Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes."
              link="/Taille_des_vignes"
              imageSrc={lastImage3.img ? `data:image/jpeg;base64,${lastImage3.img}` : ''}
            />
          )}

          {lastImage4 && (
            <ServiceCard
              key={lastImage4._id}
              title="Liage des bois"
              description="Le liage des bois est essentiel pour la structure et la santé de vos vignes."
              link="/Liage_des_bois"
              imageSrc={lastImage4.img ? `data:image/jpeg;base64,${lastImage4.img}` : ''}
            />
          )}

          {lastImage5 && (
            <ServiceCard
              key={lastImage5._id}
              title="Ebourgeonnage des vignes"
              description="Nous nous occupons de l'ébourgeonnage pour favoriser la bonne croissance des vignes."
              link="/Ebourgeonnage"
              imageSrc={lastImage5.img ? `data:image/jpeg;base64,${lastImage5.img}` : ''}
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
    </div>
  );
}

export default Travauxmanuels_admin;
