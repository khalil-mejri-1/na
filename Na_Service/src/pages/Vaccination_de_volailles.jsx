import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import './PrestationsViticoles.css';
import NavBar from '../comp/NavBar.jsx';
import './travauxManuels.css'; 

function Vaccination_de_volailles() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    axios.get('http://localhost:3000/vaccination-de-volailles') // تأكد من أن هذا هو عنوان API الصحيح
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
      });
  }, []);

  // فلترة الصور حسب الفئة
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Vaccination (simple et double)');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Seringues de différents dosage');

  // اختيار آخر صورة من كل فئة
  const lastImage = filteredImages[filteredImages.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];

  return (
    <>
      <NavBar />
      <div className="vineyard-services_travaux">
        <h1>Vaccination de volailles</h1>
        <div className="services-container_travaux">
          {lastImage && (
            <ServiceCard
              key={lastImage._id} // استخدم _id بدلاً من id لضمان عدم التعارض
              title="Vaccination (simple et double)"
              description="Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes."
              imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من أن تنسيق الصورة صحيح
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id}
              title="Seringues de différents dosage"
              description="Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes."
              imageSrc={lastImage2.img ? `data:image/jpeg;base64,${lastImage2.img}` : ''}
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

export default Vaccination_de_volailles;
