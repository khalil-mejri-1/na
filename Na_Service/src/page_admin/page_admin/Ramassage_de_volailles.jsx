import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // استيراد Link
import './PrestationsViticoles.css';
import Navbar from ".././comp_admin/NavBarAdmin.jsx";
import axios from 'axios'; // استيراد axios

function Ramassage_de_volailles_admin() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    axios.get('http://localhost:3000/ramassage-de-volailles') // تأكد من أن هذا هو عنوان API الصحيح
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
      });
  }, []);

  // فلترة الصور حسب الفئة
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Chargement');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Déchargement');
  const filteredImages3 = images.filter(imageData => imageData.selectCategory === 'Mise en place et transfert de poulettes');

  // اختيار آخر صورة من كل فئة
  const lastImage = filteredImages[filteredImages.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];
  const lastImage3 = filteredImages3[filteredImages3.length - 1];

  return (
    <>
      <Navbar />
      <div className="vineyard-services_travaux">
        <h1>ramassage-de-volailles</h1>
        <div className="services-container_travaux">
          {lastImage && (
            <ServiceCard
              key={lastImage._id} // استخدم _id بدلاً من id لضمان عدم التعارض
              title="Chargement"
              description="Nos équipes s'occupent de l'installation des parcelles viticoles pour garantir un bon départ à vos vignes."
              imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من أن تنسيق الصورة صحيح
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id}
              title="Déchargement"
              description="Nous effectuons le cisaillage des plantations pour optimiser la croissance des vignes."
              imageSrc={lastImage2.img ? `data:image/jpeg;base64,${lastImage2.img}` : ''}
            />
          )}

          {lastImage3 && (
            <ServiceCard
              key={lastImage3._id}
              title="Mise en place et transfert de poulettes"
              description="Nos équipes expérimentées garantissent une taille optimale pour améliorer la qualité des récoltes."
              imageSrc={lastImage3.img ? `data:image/jpeg;base64,${lastImage3.img}` : ''}
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

export default Ramassage_de_volailles_admin;
