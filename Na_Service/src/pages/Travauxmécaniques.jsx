import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import './PrestationsViticoles.css';
import NavBar from '../comp/NavBar.jsx';
import './travauxManuels.css'; 

function Travaux_mecaniques() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    // جلب البيانات من API
    axios.get('https://na-service.onrender.com/travaux-mecaniques') // تأكد من أن هذا هو عنوان API الصحيح
      .then(response => {
        setImages(response.data); // تخزين البيانات في الحالة
      })
      .catch(err => {
        console.error('Error fetching images:', err);
      });
  }, []);

  // فلترة الصور حسب الفئة
  const filteredImages = images.filter(imageData => imageData.selectCategory === 'Rognage et effeuillage mécanique des vignes');
  const filteredImages2 = images.filter(imageData => imageData.selectCategory === 'Ramassage des pierres dans les parcelles');
  const filteredImages3 = images.filter(imageData => imageData.selectCategory === 'Broyage des bois de taille');
  const filteredImages4 = images.filter(imageData => imageData.selectCategory === 'Épandage d engrais');
  const filteredImages5 = images.filter(imageData => imageData.selectCategory === 'Tontes');

  // اختيار آخر صورة من كل فئة
  const lastImage = filteredImages[filteredImages.length - 1];
  const lastImage2 = filteredImages2[filteredImages2.length - 1];
  const lastImage3 = filteredImages3[filteredImages3.length - 1];
  const lastImage4 = filteredImages4[filteredImages4.length - 1];
  const lastImage5 = filteredImages5[filteredImages5.length - 1];

  return (
    <>
      <NavBar />
      <div className="vineyard-services_travaux">
        <h1>Travaux mécaniques</h1>
       
        <div className="services-container_travaux">
          {lastImage && (
            <ServiceCard
              key={lastImage._id} // استخدم _id بدلاً من id لضمان عدم التعارض
              title="Rognage et effeuillage mécanique des vignes"
              description="Nos équipes s'occupent du rognage et de l'effeuillage mécanique pour garantir des vignes en pleine santé."
              link="/Rognage_et_effeuillage"
              imageSrc={lastImage.img ? `data:image/jpeg;base64,${lastImage.img}` : ''} // تأكد من أن تنسيق الصورة صحيح
            />
          )}

          {lastImage2 && (
            <ServiceCard
              key={lastImage2._id}
              title="Ramassage des pierres"
              description="Nous assurons le ramassage des pierres dans vos parcelles pour faciliter les travaux de culture."
              link="/Ramassage_des_pierres"
              imageSrc={lastImage2.img ? `data:image/jpeg;base64,${lastImage2.img}` : ''}
            />
          )}

          {lastImage3 && (
            <ServiceCard
              key={lastImage3._id}
              title="Broyage des bois de taille"
              description="Nos équipes effectuent le broyage des bois de taille pour un entretien efficace de vos vignes."
              link="/Broyage_des_bois"
              imageSrc={lastImage3.img ? `data:image/jpeg;base64,${lastImage3.img}` : ''}
            />
          )}

          {lastImage4 && (
            <ServiceCard
              key={lastImage4._id}
              title="Épandage d'engrais"
              description="Nous réalisons l'épandage d'engrais pour optimiser la nutrition de vos vignes."
              link="/Epandage_engrais"
              imageSrc={lastImage4.img ? `data:image/jpeg;base64,${lastImage4.img}` : ''}
            />
          )}

          {lastImage5 && (
            <ServiceCard
              key={lastImage5._id}
              title="Tontes"
              description="Nous nous occupons des tontes pour maintenir la propreté et la santé de votre vignoble."
              link="/Tontes"
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

export default Travaux_mecaniques;
